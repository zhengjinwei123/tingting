package main

import (
	"YUT/manager/authManager"
	"YUT/manager/configManager"
	"YUT/manager/mysqlManager"
	"YUT/manager/userManager"
	"YUT/service/blogservice"
	"YUT/service/userservice"
	"YUT/utils"
	"context"
	l4g "github.com/alecthomas/log4go"
	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"net/http"
	"os"
	"os/signal"
	"path/filepath"
	"syscall"
	"time"
)

var g_signal = make(chan os.Signal, 1)



func main() {

	configManager.InitL4g()
	defer configManager.CloseL4g()

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
			r.Post("/register", userservice.UserRegisterPup)
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

	l4g.Debug("api server start %s", serverConf.Http)



	p, _ := filepath.Abs(filepath.Dir("./public/"))
	m := http.NewServeMux()
	fs := http.FileServer(http.Dir(p))
	//m.Handle("/", http.StripPrefix("/", fs))
	m.Handle("/", StaticMiddleware("/", fs))

	staticServ := &http.Server{Addr: ":9000", Handler: m}
	l4g.Debug("static server start: %d", 9000)


	go staticServ.ListenAndServe()

	listenSignal(context.Background(), httpServer, staticServ)
}

func listenSignal(ctx context.Context, httpSrv *http.Server, httpStaticSrv *http.Server) {
	signal.Notify(g_signal, os.Interrupt, syscall.SIGTERM, syscall.SIGQUIT, syscall.SIGHUP, syscall.SIGINT)

	select {
	case sig := <- g_signal:
		l4g.Warn("catch signal %s \n", sig.String())
		userManager.GetUsrSessionMgr().OnShutDown()
		httpSrv.Shutdown(ctx)
		httpStaticSrv.Shutdown(ctx)
	}
}
