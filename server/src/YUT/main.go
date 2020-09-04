package main

import (
	"YUT/manager/authManager"
	"YUT/manager/configManager"
	"YUT/manager/mysqlManager"
	"YUT/service/blogservice"
	"YUT/service/userservice"
	"YUT/utils"
	"context"
	"fmt"
	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"log"
	"net/http"
	"os"
	"os/signal"
	"path/filepath"
	"syscall"
	"time"
)

var g_signal = make(chan os.Signal, 1)

func main() {

	r := chi.NewRouter()
	r.Use(middleware.RequestID)
	r.Use(middleware.RealIP)
	r.Use(middleware.Recoverer)

	r.Use(middleware.Timeout(60*time.Second))

	r.Route("/api", func(r chi.Router) {

		r.Use(ApiMiddleware)

		r.Mount("/user", UserRouter())
		r.Mount("/global", GlobalRouter())
		r.Mount("/blog", BlogRouter())
	})

	r.Route("/pub", func(r chi.Router) {

		r.Route("/blog/{blog_id}", func(r chi.Router) {
			r.Use(PubBlogMiddleware)
			r.Post("/", blogservice.GetBlog)
		})

		r.Route("/user", func(r chi.Router) {
			r.Post("/profile", userservice.GetProfile)
		})
	})

	// 权限路由加载
	if err := authManager.GetAuthManager().Load(); err != nil {
		utils.PanicExt(err.Error())
	}
	// 加载mysql
	serverConf, err := configManager.GetServerConfig()
	if err != nil {
		utils.PanicExt(err.Error())
		return
	}

	mysqlProxy := mysqlManager.GetMysqlProxy()
	if err := mysqlProxy.Init(serverConf.GetMysqlAddr()); err != nil {
		utils.PanicExt(err.Error())
	}
	defer mysqlProxy.Close()

	httpServer := &http.Server{Addr: serverConf.Http, Handler: r}

	go httpServer.ListenAndServe()

	fmt.Println("api server start", serverConf.Http)

	go func() {
		p, _ := filepath.Abs(filepath.Dir("./public/"))

		http.Handle("/", http.FileServer(http.Dir(p)))
		fmt.Println("static server start:", 9000)
		http.ListenAndServe(":9000", nil)
	}()

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
