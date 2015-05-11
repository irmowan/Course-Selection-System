CREATE TABLE IF NOT EXISTS `account` (
  `id` varchar(32) CHARACTER SET latin1 NOT NULL,
  `password` varchar(32) CHARACTER SET latin1 NOT NULL,
  `level` int(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS `admin` (
  `aid` varchar(32) NOT NULL,
  `aname` varchar(10) NOT NULL,
  `age` int(3) DEFAULT NULL,
  `sex` char(1) DEFAULT NULL,
  PRIMARY KEY (`aid`),
  FOREIGN KEY(`aid`) References account(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `student` (
  `sid` varchar(32) NOT NULL,
  `sname` varchar(10) NOT NULL,
  `age` int(3) DEFAULT NULL,
  `sex` char(1) DEFAULT NULL,
  `major` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`sid`),
  FOREIGN KEY(`sid`) References account(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `teacher` (
  `tid` varchar(32) NOT NULL,
  `tname` varchar(50) DEFAULT NULL,
  `prof` varchar(50) DEFAULT NULL,
  `major` varchar(50) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `sex` char(1) DEFAULT NULL,
  PRIMARY KEY (`tid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `course` (
  `cid` varchar(100) NOT NULL,
  `num` int(11) NOT NULL,
  `cname` varchar(200)  DEFAULT NULL,
  `major` varchar(50) DEFAULT NULL,
  `credit` float DEFAULT NULL,
  PRIMARY KEY (`cid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `sc` (
  `sid` varchar(32) NOT NULL,
  `cid` varchar(100) NOT NULL,
  `grade` char(2) DEFAULT NULL,
  PRIMARY KEY (`sid`,`cid`),
  FOREIGN KEY(`sid`) REFERENCES student(`sid`),  
  FOREIGN KEY(`cid`) REFERENCES course(`sid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `ctime` (
  `cid` varchar(100) NOT NULL,
  `day` int(11) NOT NULL,
  `starttime` int(11) NOT NULL,
  `durtime` int(11) NOT NULL,
  `place` varchar(100) NOT NULL,
  `additional` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`cid`,`day`,`starttime`,`durtime`),
  FOREIGN KEY(`cid`) REFERENCES course(`cid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `cteacher` (
  `cid` varchar(100) NOT NULL,
  `tid` varchar(100) NOT NULL,
  PRIMARY KEY (`cid`,`tid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;