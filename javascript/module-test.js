var dropdown = (function() {

	var module = {
	    node: null,
		dataset: null,
		init: function(node) {

			module.node = node

			module.data.init(function() {

				module.view.init(node)
				module.controller.init()
			})
		}
	}
    
    // 定义模板，初始化模板
	module.view = {

		html: '<div><ul>fs-replace</ul></div>',
		init: function(node) {
    
            // TODO: 增加格式校验
			var html = ''
			var data = module.dataset

			for (var i = 0, length = data.length; i < length; i++) {

				html += '<li>' + data[i] + '</li>'
			}

			module.view.html = module.view.html.replace('fs-replace', html)

			node.innerHTML = module.view.html
		}
	}

    // 事件，数据逻辑
	module.controller = {

		init: function() {
			// 初始化view层	
			module.view.init(module.dataset)
			// 绑定事件
			module.controller.registerEvent(module.node)
		},

		registerEvent: function(node) {

			// 点击时切换下拉列表的隐藏、显示 	   
			node.addEventListener('click', function() {

				alert(node.getAttribute('id') + '  clicked')

			},
			false)

		}
	}
    
    // 数据读取、存储
	module.data = {

		init: function(callback) {

			var url = '/people'
			var d = ['男', '女']

			module.dataset = d
			callback && callback()
		}
	}

	return module
})()

