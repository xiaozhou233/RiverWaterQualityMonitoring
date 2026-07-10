import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import classes from "../assets/Dashboard.module.css";


export function Banner({ menuButton }: { menuButton?: ReactNode }){
  const [time,setTime] = useState("");
  useEffect(()=>{
    const timer=setInterval(()=>{
      setTime(
        new Date()
        .toLocaleString("zh-CN")
      );
    },1000);
    return ()=>clearInterval(timer);
  },[]);
  return (
    <header className={classes.banner}>
      <div>
        <div className={classes.title}>
          智慧河流水质监测系统
        </div>
        <div className={classes.subtitle}>
          Smart River Water Quality Monitoring System
        </div>

      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>

        <div className={classes.clockBox}>
          <div>
            当前时间
          </div>
          <div className={classes.clock}>
            {time}
          </div>
        </div>
        {menuButton && (
          <div>
            {menuButton}
          </div>
        )}
      </div>
    </header>
  );

}