package mysqlManager

import (
	"database/sql"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
	"log"
)

type mysqlProxy struct {
	proxy *sqlx.DB
}

func (this *mysqlProxy) Init(addr string) error {
	var err error
	this.proxy, err = sqlx.Open("mysql", addr)
	if err != nil {
		log.Printf("init mysql error: %s %v \n", addr, err)
		return err;
	}

	this.proxy.SetMaxOpenConns(20)
	this.proxy.SetMaxIdleConns(10)

	return nil
}

func (this *mysqlProxy) Close() {
	if this.proxy != nil {
		err := this.proxy.Close()
		if err != nil {
			log.Printf("close mysql error: %v \n", err)
		}
		this.proxy = nil
	}
}

func (this *mysqlProxy) Insert(sql string) error {
	if _, err := this.proxy.Exec(sql); err != nil {
		log.Printf("Exec mysql error: %s %v \n", sql, err)
		return err
	}
	return nil
}

func (this *mysqlProxy) GetCount(sql string) (int, error) {
	rows, err := this.proxy.Query(sql)
	if err != nil {
		return 0, err
	}

	count := 0
	for rows.Next(){
		count += 1
	}

	fmt.Println(fmt.Sprintf("getcounrt: %d", count))
	return count, nil
}

func (this *mysqlProxy) QueryOne(sql string, v interface{}) error {
	err := this.proxy.Get(v, sql)
	return err
}

func (this *mysqlProxy) QueryList(sql string, v interface{}) error {
	err := this.proxy.Select(v, sql)
	return err
}

func (this *mysqlProxy) Update(sql string, args ...interface{}) (error, int64) {
	results, err := this.proxy.Exec(sql, args...)
	if err != nil {
		return err, 0
	}
	affectedN, err := results.RowsAffected()
	if err != nil {
		return err, 0
	}
	return nil, affectedN
}

func (this *mysqlProxy) Delete(sql string, args ...interface{}) (error, int64) {
	results, err := this.proxy.Exec(sql, args...)
	if err != nil {
		return err, 0
	}
	affectedN, err := results.RowsAffected()
	if err != nil {
		return err, 0
	}
	return nil, affectedN
}

func (this *mysqlProxy) clearTransaction(tx *sqlx.Tx) {
	err := tx.Rollback()
	if err != sql.ErrTxDone && err != nil {
		log.Println(err)
	}
}

func (this *mysqlProxy) UpdateMulti(sql []string) (error) {
	//tx, err := this.proxy.Beginx()
	//defer this.clearTransaction(tx)
	//if err != nil {
	//	log.Fatalln(err)
	//	return err
	//}
	//
	//rs, err := tx.Exec(sql, args...)
	//if err != nil {
	//	return err
	//}
	//
	//if err != nil {
	//	log.Fatalln(err)
	//	return err
	//}


	//if err := tx.Commit(); err != nil {
	//	// tx.Rollback() 此时处理错误，会忽略doSomthing的异常
	//	log.Fatalln(err)
	//}

	return nil
}


func NewMysqlProxy() *mysqlProxy {
	proxy := &mysqlProxy{
		proxy: nil,
	}
	return proxy
}

// export
var myProxy = NewMysqlProxy()
func GetMysqlProxy() *mysqlProxy {
	return myProxy
}