import {
  IconDashboard,
  IconChartLine,
  IconDatabase,
  IconDevices,
  IconSettings,
  IconDroplet
} from '@tabler/icons-react';

import { Group, Text } from '@mantine/core';
import { useNavigate, useLocation } from 'react-router-dom';

import classes from './Navbar.module.css';


const data = [

  {
    label:'控制面板',
    path:'/',
    icon:IconDashboard,
  },

  {
    label:'实时监测',
    path:'/monitor',
    icon:IconChartLine,
  },

  {
    label:'历史数据',
    path:'/history',
    icon:IconDatabase,
  },

  {
    label:'设备管理',
    path:'/device',
    icon:IconDevices,
  },

  {
    label:'系统设置',
    path:'/settings',
    icon:IconSettings,
  },

];



export function Navbar({
  onClose
}:{
  onClose?:()=>void;
}){
  const navigate = useNavigate();
  const location = useLocation();

  const links = data.map((item)=>(
    <button
      className={classes.link}
      data-active={
        location.pathname === item.path || undefined
      }
      key={item.label}
      onClick={()=>{
        navigate(item.path);
        onClose?.();
      }}

    >
      <item.icon
        className={classes.linkIcon}
        stroke={1.8}
        size={22}
      />
      <span>
        {item.label}
      </span>
    </button>

  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header}>
          <div className={classes.logo}>
            <IconDroplet size={32}/>
          </div>
          <div>
            <Text fw={700}>
              智慧河流水质监测系统
            </Text>
            <Text size="xs" c="dimmed">
              Water Quality Monitor
            </Text>
          </div>
        </Group>
        <div className={classes.menu}>
          {links}
        </div>
      </div>
    </nav>

  );

}