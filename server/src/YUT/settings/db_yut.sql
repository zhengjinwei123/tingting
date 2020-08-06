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
    `id` tinyint(2) NOT NULL DEFAULT 0 COMMENT 'id',
    `menus` varchar(255) NOT NULL DEFAULT '' COMMENT '菜单列表',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

insert into t_group(`id`,`menus`) VALUES(1, "100,101,102,103,200,201,202,300,301,302,400,401,402,403,500,501,502,600,601");
