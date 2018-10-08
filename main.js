/**
 *  执行补间动画方法
 *
 * @param      {Number}    start     开始数值
 * @param      {Number}    end       结束数值
 * @param      {Number}    time      补间时间
 * @param      {Function}  callback  每帧回调
 * @param      {Function}  timing    速度曲线，默认匀速
 */
function animate(start, end, time, callback, timing = t => t) {
    let startTime = performance.now() // 设置开始的时间戳
    let differ = end - start // 拿到数值差值
    // 创建每帧之前要执行的函数
    function loop() {
        raf = requestAnimationFrame(loop) // 下一阵调用每帧之前要执行的函数
        const passTime = performance.now() - startTime // 获取当前时间和开始时间差
        let per = passTime / time // 计算当前已过百分比
        if (per >= 1) { // 判读如果已经执行
            per = 1 // 设置为最后的状态
            cancelAnimationFrame(raf) // 停掉动画
        }
        const pass = differ * timing(per) // 通过已过时间百分比*开始结束数值差得出当前的数值
        callback(pass)
    }
    let raf = requestAnimationFrame(loop) // 下一阵调用每帧之前要执行的函数
}