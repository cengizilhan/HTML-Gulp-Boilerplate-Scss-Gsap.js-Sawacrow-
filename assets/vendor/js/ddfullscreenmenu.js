// Multi-Level Full Screen Menu Script v1.0
// Date: Jan 13th, 17'
// By Dynamic Drive: http://www.dynamicdrive.com

// classLists Pollyfill: https://github.com/remy/polyfills/blob/6e87470526c496c0fc53fa87ed5a825eff61f1f3/classList.js

(function () {

    if (typeof window.Element === "undefined" || "classList" in document.documentElement) return;
    
    var prototype = Array.prototype,
        push = prototype.push,
        splice = prototype.splice,
        join = prototype.join;
    
    function DOMTokenList(el) {
      this.el = el;
      // The className needs to be trimmed and split on whitespace
      // to retrieve a list of classes.
      var classes = el.className.replace(/^\s+|\s+$/g,'').split(/\s+/);
      for (var i = 0; i < classes.length; i++) {
        push.call(this, classes[i]);
      }
    };
    
    DOMTokenList.prototype = {
      add: function(token) {
        if(this.contains(token)) return;
        push.call(this, token);
        this.el.className = this.toString();
      },
      contains: function(token) {
        return this.el.className.indexOf(token) != -1;
      },
      item: function(index) {
        return this[index] || null;
      },
      remove: function(token) {
        if (!this.contains(token)) return;
        for (var i = 0; i < this.length; i++) {
          if (this[i] == token) break;
        }
        splice.call(this, i, 1);
        this.el.className = this.toString();
      },
      toString: function() {
        return join.call(this, ' ');
      },
      toggle: function(token) {
        if (!this.contains(token)) {
          this.add(token);
        } else {
          this.remove(token);
        }
    
        return this.contains(token);
      }
    };
    
    window.DOMTokenList = DOMTokenList;
    
    function defineElementGetter (obj, prop, getter) {
        if (Object.defineProperty) {
            Object.defineProperty(obj, prop,{
                get : getter
            });
        } else {
            obj.__defineGetter__(prop, getter);
        }
    }
    
    defineElementGetter(Element.prototype, 'classList', function () {
      return new DOMTokenList(this);
    });
    
    })();
    
    // Multi-Level Full Screen Menu code:
    
    var ddfullscreenmenu = (function(){
    
        var menuref,
                ulwrapper,
                mainul,
                closex,
                closetimer,
                mobilezindex = 100
    
        function animatemenu(showmenu, hidemenu, dir){
            showmenu.classList.remove('hidemenu')
            showmenu.classList.remove('showmenu')		
            hidemenu.classList.remove('hidemenu')
            hidemenu.classList.remove('showmenu')	
            if (dir == 'forward'){
                hidemenu.classList.add('hidemenu')
                showmenu.classList.add('showmenu')
            }
            else{
                showmenu.classList.add('showmenu')
            }
            showmenu.style.zIndex = mobilezindex++
        }
    
        function flattenul(ul, cloneulBol, callback, finalcall){
            var callback = callback || function(){}
            var finalcall = finalcall || function(){}
            var docfrag = document.createDocumentFragment()
            var targetul = cloneulBol? ul.cloneNode(true) : ul
            var subuls = targetul.getElementsByTagName('ul')
            var subulscount = subuls.length
            for (var i=subulscount-1; i>=0; i--){
                var subul = subuls[i]
                var header = subuls[i].parentNode
                docfrag.appendChild( subuls[i] )
                callback(i, header, subul)
            }
            docfrag.appendChild( targetul )
            finalcall(targetul)
            return docfrag
        }
    
        var mainmenufunc = {
    
            togglemenu:function(action){
                if (typeof action == 'undefined'){
                    menuref.classList.toggle('openmenu')
                }
                else{
                    menuref.classList[(action == 'open')? 'add' : 'remove']('openmenu')
                }
            },
    
            init:function(){
                menuref = document.getElementById('ddfullscreenmenu')
                ulwrapper = document.getElementById('ulwrapper')
                mainul = document.getElementById('fullscreenmenu-ul')
                closex = document.getElementById('closex')
    
                closex.addEventListener('click', function(e){ // action when user clicks on "close" button
                    ddfullscreenmenu.togglemenu('close')
                    e.preventDefault()			
                }, false)
    
                var flattened = flattenul(mainul, false,
                    function(i, header, subul){ // loop through header LIs and sub ULs
                        header.className = 'header'
                        header._submenuref = subul
                        subul.className = 'submenu'
                        var breadcrumb = document.createElement('li')
                        breadcrumb.className = "breadcrumb"
                        breadcrumb.innerHTML = header.getElementsByTagName('a')[0].firstChild.nodeValue
                        breadcrumb._headerref = header
                        subul.insertBefore(breadcrumb, subul.getElementsByTagName('li')[0])
                        header.addEventListener('click', function(e){ // action when user clicks on header (LI with children UL)
                            var headermenu = this.parentNode
                            var submenu = this._submenuref
                            animatemenu(submenu, headermenu, 'forward')
                            e.stopPropagation()
                            e.preventDefault()
                        }, false)
                        breadcrumb.addEventListener('click', function(e){ // action when user clicks on "back breadcrumb" LI
                            var parentmenu = this._headerref.parentNode
                            var curmenu = this._headerref._submenuref
                            animatemenu(parentmenu, curmenu, 'backwards')
                            e.stopPropagation()
                            e.preventDefault()
                        }, false)
                    },
                    function(topul){
                        topul.style.zIndex = mobilezindex++
                    }
                )
                ulwrapper.appendChild(flattened)
                ulwrapper.addEventListener('click', function(){ // close menu when a menu link is clicked on
                    clearTimeout(closetimer)
                    closetimer = setTimeout(function(){
                        ddfullscreenmenu.togglemenu('close')
                    }, 100)
                }, false)
            }
    
        }
    
        return mainmenufunc
    
    })();