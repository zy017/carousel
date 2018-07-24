var log = console.log.bind(console)

var e = selector => document.querySelector(selector)

var es = selector => document.querySelectorAll(selector)

var bindEvent = function(element, eventName, callback) {
    element.addEventListener(eventName, callback)
}

var removeClassAll = function(className) {
    var selector = '.' + className
    var elements = es(selector)
    for (var i = 0; i < elements.length; i++) {
        var e = elements[i]
        e.classList.remove(className)
    }
}

var bindAll = function(selector, eventName, callback) {
    var elements = es(selector)
    for (var i = 0; i < elements.length; i++) {
        var e = elements[i]
        bindEvent(e, eventName, callback)
    }
}

var nextIndex = function(slide, offset) {
    var numberOfImgs = Number(slide.dataset.imgs)
    var activeIndex = Number(slide.dataset.active)
    // 上一张 offset 是 -1
    // 下一张 offset 是 1
    var i = (numberOfImgs + activeIndex + offset) % numberOfImgs
    return i
}

var bindEventSlide = function() {
    var selector = '.slide-button'
    bindAll(selector, 'click', function(event) {
        log('click')
        var button = event.target
        var slide = button.parentElement
        var offset = Number(button.dataset.offset)
        var index = nextIndex(slide, offset)
        showImageAtIndex(slide, index)
    })
}

var showImageAtIndex = function(slide, index) {
    log('slide', index, slide)
    var nextIndex = index
    // 设置父节点的 data-active
    slide.dataset.active = nextIndex
    var nextSelector = '#id-guaimage-' + String(nextIndex)
    // 删除当前图片的 class 给下一张图片加上 class
    var className = 'active'
    removeClassAll(className)
    log('remove class', nextSelector)
    var img = e(nextSelector)
    log('next img')
    img.classList.add(className)

    // 切换小圆点
    // 1. 删除当前小圆点的 class
    removeClassAll('white')
    // 2. 得到下一个小圆点的选择器
    var indiSelector = '#id-indi-' + String(nextIndex)
    var indi = e(indiSelector)
    indi.classList.add('white')
}

var bindEventIndicator = function() {
    var selector = '.slide-indi'
    bindAll(selector, 'mouseover', function(event) {
        var self = event.target
        var index = Number(self.dataset.index)
        // 直接播放第 n 张图片
        var slide = self.closest('.slide')
        showImageAtIndex(slide, index)
    })
}

var playNextImage = function() {
    var slide = e('.slide')
    // 默认是播放下一张, 下一张的 offer 是 1, 直接传
    var index = nextIndex(slide, 1)
    showImageAtIndex(slide, index)
}

var clockId

var autoPlay = function() {
    clockId = setInterval(function() {
        playNextImage()
    }, 2000)
}

var bindEventPause = () => {
    var lb = e('.slide-container')
    lb.addEventListener('mouseover', () => {
        clearInterval(clockId)
    })
    lb.addEventListener('mouseout', () => {
        autoPlay()
    })
}

var __main = () => {
    autoPlay()
    bindEventSlide()
    bindEventIndicator()
    bindEventPause()
}

__main()
