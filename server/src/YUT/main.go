package main

import (
	"YUT/manager/configManager"
	"YUT/manager/mysqlManager"
	"context"
	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"
)

var g_signal = make(chan os.Signal, 1)

func main() {
	r := chi.NewRouter()
	r.Use(middleware.RequestID)
	r.Use(middleware.RealIP)
	r.Use(middleware.Recoverer)
	r.Use(LoggerMiddleware)

	r.Use(middleware.Timeout(60*time.Second))

	r.Route("/api", func(r chi.Router) {

		r.Mount("/user", UserRouter())
		r.Mount("/global", GlobalRouter())
	})

	// 加载mysql
	serverConf, err := configManager.GetServerConfig()
	if err != nil {
		panic(err)
	}

	mysqlProxy := mysqlManager.GetMysqlProxy()
	if err := mysqlProxy.Init(serverConf.GetMysqlAddr()); err != nil {
		panic(err)
	}
	defer mysqlProxy.Close()

	httpServer := &http.Server{Addr: serverConf.Http, Handler: r}

	go httpServer.ListenAndServe()

	listenSignal(context.Background(), httpServer)
}

func listenSignal(ctx context.Context, httpSrv *http.Server) {
	signal.Notify(g_signal, os.Interrupt, syscall.SIGTERM, syscall.SIGQUIT, syscall.SIGHUP, syscall.SIGINT)

	select {
	case sig := <- g_signal:
		log.Printf("catch signal %s \n", sig.String())
		httpSrv.Shutdown(ctx)
	}
}
