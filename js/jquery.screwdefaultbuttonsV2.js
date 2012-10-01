/*!
 * ScrewDefaultButtons v2.0.0
 * http://screwdefaultbuttons.com/
 *
 * Licensed under the MIT license.
 * Copyright 2012 Matt Solano http://mattsolano.com
 *
 * Date: Wed September 26 2012 
 */

;(function( $, window, document, undefined ){ 
	
	var methods = {
		
	    init : function(options) {
	    
	    	var defaults = $.extend( {
	    	      image:	null,
	    	      width:	50,
	    	      height:	50,
	    	      disabled:	false		
	    	    }, options);
			
			return this.each(function(){
			
		    	var $this = $(this);
		    	
		    	var $thisImage = defaults.image;
		    	var dataImage = $this.data('sdb-image');
		    	if (dataImage){
		    		$thisImage = dataImage;
		    	}
		    	
		    	if (!$thisImage){
		    		 $.error( 'There is no image assigned for ScrewDefaultButtons' );
		    	}
		    	
		    	$this.wrap('<div >').css({'display': 'none'});
		    	
				var buttonClass = $this.attr('class');
		    	var buttonClick = $this.attr('onclick');
		    	
		    	var $thisParent = $this.parent('div');
		    	
		    	$thisParent.addClass(buttonClass);
		    	$thisParent.attr('onclick',buttonClick );
		    	$thisParent.css({
		    		'background-image': $thisImage,
		    		width:	defaults.width,
		    		height: defaults.height,
		    		cursor: 'pointer'
		    	});
		    	
		    	var uncheckedPos = 0;
		    	var checkedPos = -(defaults.height);
		    	if ($this.is(':disabled')){
		    		uncheckedPos = -(defaults.height * 2);
		    		checkedPos = -(defaults.height * 3);
		    	}
		    	
		    	$this.on('disableBtn', function(){
		    		$this.attr('disabled', 'disabled');
		    		uncheckedPos = -(defaults.height * 2);
		    		checkedPos = -(defaults.height * 3);
		    		$this.trigger('resetBackground');
		    	});
		    	
		    	$this.on('enableBtn', function(){
		    		$this.removeAttr('disabled');				    		
		    		uncheckedPos = 0;
		    		checkedPos = -(defaults.height);
		    		$this.trigger('resetBackground');
		    	});
		    	
		    	$this.on('resetBackground', function(){
		    		if ($this.is(':checked')){
		    			$thisParent.css({
		    				'background-position-y': checkedPos 
		    			});
		    		}
		    		else {
		    			$thisParent.css({
		    				'background-position-y':  uncheckedPos
		    			});
		    		}
		    	});
		    	
		    	
		    	$this.trigger('resetBackground');
		    	
		    	
		    	if ($this.is(':checkbox')){
		    		
		    		$thisParent.on('click', function(){
		    			if (!($this.is(':disabled'))){
		    				$this.change();
		    			}			    	
		    		})
		    		
		    		$thisParent.addClass('styledCheckbox');
			    	
			    	$this.on('change', function(){
			    		if ($this.prop('checked')){
			    			$this.prop("checked", false);
			    			$thisParent.css({
			    				'background-position-y': uncheckedPos 
			    			});
			    		}
			    		else {
			    			$this.prop("checked", true);
			    			$thisParent.css({
			    				'background-position-y':  checkedPos
			    			});
			    		}
			    	});
			    	
			    }
			    else if ($this.is(':radio')) {
			    
			    	$thisParent.addClass('styledRadio');
			    	
			    	var $thisName = $this.attr('name');
			    	
			    	$thisParent.on('click', function(){
			    		if (!($this.prop('checked')) && !($this.is(':disabled'))){
			    			$this.change();
			    		}				    	
			    	})
			    	
			    	
			    	$this.on('change', function(){
			    		if ($this.prop('checked')){
			    			$this.prop("checked", false);
			    				$thisParent.css({
			    					'background-position-y':  uncheckedPos
			    				});
			    		}
			    		else {
			    			$this.prop("checked", true);
				    			$thisParent.css({
				    				'background-position-y':  checkedPos
				    			});
			    			
			    			var otherRadioBtns = $('input[name="'+ $thisName +'"]').not($this);
			    			otherRadioBtns.trigger('radioSwitch');
			    		}
			    	});
			    	
			    	$this.on('radioSwitch', function(){
			    		$thisParent.css({
			    			'background-position-y': uncheckedPos 
			    		});
			    	
			    	});
			    }
			    
			});
	    	
	    },
	    check : function() {
	    	return this.each(function(){
	    		var $this = $(this);
		    	if (!methods.isChecked($this)){
		      		$this.change();
		      	}
		     });	
	    },
	    uncheck : function() {
	    	return this.each(function(){
	    		var $this = $(this);
	    		if (methods.isChecked($this)){
	    	  		$this.change();
	    	  	}
	    	 });
	    },
	    toggle: function(){
	    	return this.each(function(){
		    	var $this = $(this);
		    	$this.change();
		    });
	    },
	    disable : function() { 
	    	return this.each(function(){
	    		var $this = $(this);
	    		$this.trigger('disableBtn');
	    	});
	    },
	    enable: function(){			    	
	    	return this.each(function(){
	    		var $this = $(this);
	    		$this.trigger('enableBtn');
	    	});
	    },
	    isChecked: function($this){
		    	if ($this.prop('checked')){
		    		return true;
		    	}
		    	return false;
	    }
	};
	
	$.fn.screwDefaultButtons = function( method, options) {
	    
	    // Method calling logic
	    if ( methods[method] ) {
	      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
	    } else if ( typeof method === 'object' || ! method ) {
	      return methods.init.apply( this, arguments );
	    } else {
	      $.error( 'Method ' +  method + ' does not exist on jQuery.screwDefaultButtons' );
	    }    
	  
	};
	
	return this; 
	
})( jQuery );