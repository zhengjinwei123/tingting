drop table if exists `t_user`;
CREATE TABLE `t_user` (
  `username` varchar(40) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '' COMMENT '用户名',
  `password` varchar(33) NOT NULL DEFAULT '' COMMENT '密码',
  `email` varchar(25) NOT NULL DEFAULT '' COMMENT '邮箱',
  `group_id` tinyint(2) NOT NULL DEFAULT 1 COMMENT '所属组ID',
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

insert into t_user(`username`,`password`,`email`, `group_id`) VALUES("admin", "e10adc3949ba59abbe56e057f20f883e", "2538698032@qq.com", 1);

drop table if exists `t_group`;
CREATE TABLE  `t_group` (
    `id` int(10) NOT NULL AUTO_INCREMENT,
    `desc` varchar(40) NOT NULL DEFAULT '' COMMENT '描述',
    `menus` varchar(255) NOT NULL DEFAULT '' COMMENT '菜单列表',
    `auths` varchar(1024) NOT NULL DEFAULT '' COMMENT '权限url列表',
    PRIMARY KEY (`id`),
    UNIQUE KEY (`id`,`desc`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

insert into t_group(`id`,`desc`,`menus`,`auths`) VALUES(1,"管理员",
"100,101,102,103,200,201,202,300,301,302,400,401,402,403,500,501,502,600,601",
"1001,1002,1003,1004,2001,2002,2003,2004,2005,3001,3002,3003,3004,4001,4002,4003,4004,5001,5002,5003,5004,6001,6002,6003,6004,6005,6006");
