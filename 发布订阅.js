//基础实现
function f1(...args){
    console.log(`${args[0]},${args[1]}订阅了我`)
}

class EventEmitter{
    constructor(){
        this.events={};//存储所有的事件和回调函数
    }

    //订阅事件
    on(eventName,callback){
        //没有该事件,添加事件
        if(!this.events[eventName]){
            this.events[eventName]=[];
        }
        this.events[eventName].push(callback);
        //返回取消订阅的函数，也可以不返回，就是取消订阅更麻烦
        return ()=>this.off(eventName,callback);

    }
    //触发事件
    emit(eventName,...args){
        const callbacks=this.events[eventName]
        //检查有没有订订阅者
        if(!callbacks){
            return false;
        }else{
            callbacks.forEach((callback)=>{
                callback.apply(this,args);
            })
            return true
        }
    }
    //取消订阅
    off(eventName,callback){
        const callbacks=this.events[eventName]
        if(!callbacks){
            return false;
        }
        //不传指定callback，则删除所有监听器
        if(!callback){
            delete this.events[eventName]
        }else{//删除指定监听器
            this.events[eventName]=callbacks.filter(cb=>cb!==callback)
        }
    }
    //订阅单次,将订阅与取消订阅封装在一起，然后订阅这个包装后的函数，就能实现订阅后就取消订阅
    once(eventName,callback){
        //闭包函数，访问了外层函数的变量
        const wrapper=(...args)=>{
            callback.apply(this,args);
            this.off(eventName,wrapper);
        }
        this.on(eventName,wrapper)
    }
}

//执行：控制台输入：node 发布订阅.js
const emitter=new EventEmitter();
emitter.on('click',f1)
emitter.emit('click','昨天','小红')

