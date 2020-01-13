import React from 'react';
import './verification-code.scss';

let contentBox = null; // 容器
let bgBox = null; // 背景
let textBox = null; // 文字
let operateBtn = null; // 滑块
let isSuccess = false; // 是否通过验证的标志
let downX = 999;
let distance = 0; // 滑动成功的宽度（距离）
let callback = null;

export default class SliderCheck extends React.Component {

    constructor(props) {
        super(props);
        callback = props.handleVerification;
    }

    /**
     * 挂载完成
     */
    componentDidMount() {
        contentBox = document.getElementById('contentBox'); // 容器
        bgBox = document.getElementById('bgBox'); // 背景
        textBox = document.getElementById('textBox'); // 文字
        operateBtn = document.getElementById('operateBtn'); // 滑块
        distance = contentBox.offsetWidth - operateBtn.offsetWidth;
    }

    /**
     * 滑块按下事件
     * @param e
     */
    onMouseDownEvent(e) {
        // 验证成功不允许再操作滑块
        if (isSuccess) {
            return false
        }
        // 1.鼠标按下之前必须清除掉后面设置的过渡属性
        operateBtn.style.transition = '';
        bgBox.style.transition = '';
        // 说明：clientX 事件属性会返回当事件被触发时，鼠标指针向对于浏览器页面(或客户区)的水平坐标。
        // 2.当滑块位于初始位置时，得到鼠标按下时的水平位置
        downX = e.clientX;
        document.onmousemove = this.onMouseMoveEvent;
        document.onmouseup = this.onMouseUpEvent;
    }

    /**
     * 滑块移动事件
     * @param e
     */
    onMouseMoveEvent(e) {
        // 阻止冒泡、阻止默认事件
        e.stopPropagation();
        e.preventDefault();
        // 1.获取鼠标移动后的水平位置
        const moveX = e.clientX;
        // 2.得到鼠标水平位置的偏移量（鼠标移动时的位置 - 鼠标按下时的位置）
        let offsetX = moveX - downX;
        // 3.在这里判断一下：鼠标水平移动的距离 与 滑动成功的距离 之间的关系
        if (offsetX > distance) {
            // 如果滑过了终点，就将它停留在终点位置
            offsetX = distance;
        } else if (offsetX < 0) {
            // 如果滑到了起点的左侧，就将它重置为起点位置
            offsetX = 0;
        }
        // 4.根据鼠标移动的距离来动态设置滑块的偏移量和背景颜色的宽度
        operateBtn.style.left = offsetX + 'px';
        bgBox.style.width = offsetX + 'px';
        // 如果鼠标的水平移动距离 = 滑动成功的宽度
        if (offsetX === distance) {
            // 1.设置滑动成功后的样式
            textBox.innerHTML = '验证通过';
            textBox.style.color = '#fff';
            operateBtn.innerHTML = '√';
            operateBtn.style.color = 'green';
            bgBox.style.backgroundColor = 'lightgreen';
            // 2.设置滑动成功后的状态
            isSuccess = true;
            // 成功后，清除掉鼠标按下事件和移动事件（因为移动时并不会涉及到鼠标松开事件）
            operateBtn.onmousedown = null;
            document.onmousemove = null;
        }
    }

    /**
     * 滑块松开事件
     * @param e
     */
    onMouseUpEvent(e) {
        // 阻止冒泡、阻止默认事件
        e.stopPropagation();
        e.preventDefault();
        if (!isSuccess) {
            // 如果鼠标松开时，滑到了终点，则验证通过
            // 反之，则将滑块复位（设置了1s的属性过渡效果）
            operateBtn.style.left = 0 + 'px';
            bgBox.style.width = 0 + 'px';
            operateBtn.style.transition = 'left 0.01s ease';
            bgBox.style.transition = 'width 1s ease';
        }
        //只要鼠标松开了，说明此时不需要拖动滑块了，那么就清除鼠标移动和松开事件。
        document.onmousemove = null;
        document.onmouseup = null;
        if (callback) callback(isSuccess);
    }

    render() {
        return (
            <div id='contentBox' className='content-box'>
                <div id='bgBox' className='bg-box'/>
                <div id='textBox' className='text-box'>请拖动滑块验证</div>
                <div id='operateBtn' className='operate-btn' onMouseDown={this.onMouseDownEvent.bind(this)}>>></div>
            </div>
        )
    }
}
