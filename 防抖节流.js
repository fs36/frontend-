//防抖：连续触发时，只在停止触发后执行一次
import { useRef, useEffect, useCallback } from "react";
function useDebounce(callback, delay) {
  //创建一个 ref 用来存储定时器 id
  const timer = useRef(null);

  const debouncedFn = useCallback(
    (...args) => {
      //如果之前有定时器，清除
      if (timer.current) clearTimeout(timer.current);
      //创建新的定时器
      timer.current = setTimeOut(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay],
  );
  //组件卸载时清理定时器，防止内存泄漏
  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);
  //返回防抖后的函数
  return debouncedFn;
}
//使用示例
//  const handleSearch = useDebounce((val) => {
//     console.log('搜索关键字:', val);
//   }, 300);

//节流：固定时间间隔触发一次
function useThrottle(callback, delay) {
  const lastTime = useRef(0);
  const timer = useRef(null);

  const throttleFn = useCallBack(
    (...args) => {
      const now = Date.now();
      //距离下一次执行还剩多少时间
      const remaining = delay - (now - lastTime.current);
      //立即执行
      if (remaining <= 0) {
        if (timer.current) {
          // 清理可能存在的定时器
          clearTimeout(timer.current);
          timer.current = null;
        }
        lastTime.current = now;
        callback(...args);
      }
      //未到时间，设置定时器
      else if (!timer.current) {
        timer.current = setTimeOut(() => {
          timer.current = null;
          lastTime.current = now;
          callback(...args);
        }, remaining);
      }
      useEffect(() => {
        return () => {
          if (timer.current) clearTimeout(timer.current);
        };
      }, []);
      return throttleFn;
    },
    [callback, delay],
  );
}
