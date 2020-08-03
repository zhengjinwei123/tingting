drop table if exists `t_user`;
CREATE TABLE `t_user` (
  `username` varchar(40) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '用户名',
  `password` varchar(33) NOT NULL DEFAULT '' COMMENT '密码',
  `email` varchar(25) NOT NULL DEFAULT '' COMMENT '邮箱',
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

insert into t_user(`username`,`password`,`email`) VALUES("admin", "e10adc3949ba59abbe56e057f20f883e", "2538698032@qq.com");