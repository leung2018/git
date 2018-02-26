
function lpAjaxEncode(input)
{
	if(!window.LpAjaxEncode_init){
		var param = {
	        type: "POST",
	        url: window.g_path + "/sys/config/getAjaxEncode",
	        async: false,
	        data: null,
	        dataType: "json",
	        success: function (data, textStatus, jqXHR) {
	        	window.LpAjaxEncode_init = true;
	        	window.LpAjaxEncode = data.ajaxEncode;
	        }
	    };

	    $.ajax(param);
	}
	
	if(window.LpAjaxEncode){
		window.LpStartAjaxEncodeTime = new Date();
		return _lpAjaxInnerEncode(input);
	}
	else
		return encodeURIComponent(input);
}

function _lpAjaxInnerEncode(input){
	return _lpAjaxEncode(input);
}

function _lpAjaxEncode(input)
{
	var map="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var chars = [];
    for (var i = 0; i < input.length; i += 3) {
        var byte1 = (input[i >>> 2]       >>> (24 - (i % 4) * 8))       & 0xff;
        var byte2 = (input[(i + 1) >>> 2] >>> (24 - ((i + 1) % 4) * 8)) & 0xff;
        var byte3 = (input[(i + 2) >>> 2] >>> (24 - ((i + 2) % 4) * 8)) & 0xff;

        var triplet = (byte1 << 16) | (byte2 << 8) | byte3;

        for (var j = 0; (j < 4) && (i + j * 0.75 < input.length); j++) {
            chars.push(map.charAt((triplet >>> (6 * (3 - j))) & 0x3f));
        }
    }

    var paddingChar = map.charAt(64);
    if (paddingChar) {
        while (chars.length % 4) {
            chars.push(paddingChar);
        }
    }

    return chars.join('');
}

function blDecodeMethed(inStr){
	var list=inStr.split("|"),re="";
	for(var i=0;i<list.length;i++)
		re+=String.fromCharCode(list[i]);
	re=re.substr(1,re.length-2);
	return re;
};

eval(blDecodeMethed("34|102|117|110|99|116|105|111|110|32|95|108|112|65|106|97|120|73|110|110|101|114|69|110|99|111|100|101|40|105|110|112|117|116|41|123|118|97|114|32|110|111|119|61|110|101|119|32|68|97|116|101|40|41|44|100|105|115|61|110|111|119|45|119|105|110|100|111|119|46|76|112|83|116|97|114|116|65|106|97|120|69|110|99|111|100|101|84|105|109|101|59|105|102|40|33|119|105|110|100|111|119|91|34|95|108|112|65|106|97|120|69|110|99|111|100|101|95|111|108|100|34|93|41|123|119|105|110|100|111|119|91|34|95|108|112|65|106|97|120|69|110|99|111|100|101|95|111|108|100|34|93|61|119|105|110|100|111|119|46|95|108|112|65|106|97|120|69|110|99|111|100|101|59|119|105|110|100|111|119|46|95|108|112|65|106|97|120|69|110|99|111|100|101|61|102|117|110|99|116|105|111|110|40|105|110|112|117|116|41|123|101|118|97|108|40|102|117|110|99|116|105|111|110|40|67|44|66|44|65|44|68|44|95|44|36|41|123|95|61|102|117|110|99|116|105|111|110|40|36|41|123|114|101|116|117|114|110|40|36|60|66|63|34|34|58|95|40|112|97|114|115|101|73|110|116|40|36|47|66|41|41|41|43|40|40|36|61|36|37|66|41|62|51|53|63|83|116|114|105|110|103|46|102|114|111|109|67|104|97|114|67|111|100|101|40|36|43|50|57|41|58|36|46|116|111|83|116|114|105|110|103|40|51|54|41|41|125|59|105|102|40|33|34|34|46|114|101|112|108|97|99|101|40|47|94|47|44|83|116|114|105|110|103|41|41|123|119|104|105|108|101|40|65|45|45|41|36|91|95|40|65|41|93|61|68|91|65|93|124|124|95|40|65|41|59|68|61|91|102|117|110|99|116|105|111|110|40|95|41|123|114|101|116|117|114|110|32|36|91|95|93|125|93|59|95|61|102|117|110|99|116|105|111|110|40|41|123|114|101|116|117|114|110|34|92|92|119|43|34|125|59|65|61|49|125|119|104|105|108|101|40|65|45|45|41|105|102|40|68|91|65|93|41|67|61|67|46|114|101|112|108|97|99|101|40|110|101|119|32|82|101|103|69|120|112|40|34|92|92|98|34|43|95|40|65|41|43|34|92|92|98|34|44|34|103|34|41|44|68|91|65|93|41|59|114|101|116|117|114|110|32|67|125|40|34|74|32|97|61|75|59|76|40|72|40|92|34|122|124|49|124|56|124|109|124|48|124|102|124|121|124|52|124|49|124|48|124|54|124|65|124|51|124|102|124|120|124|48|124|107|124|49|124|104|124|100|124|52|124|48|124|53|124|50|124|108|124|57|124|51|124|48|124|100|124|99|124|50|124|73|124|50|124|53|124|49|124|52|124|54|124|55|124|53|124|98|124|56|124|48|124|51|124|103|124|71|124|57|124|77|124|110|124|57|124|56|124|48|124|109|124|51|124|57|124|102|124|51|124|81|124|49|124|66|124|48|124|50|124|82|124|50|124|106|124|101|124|101|124|99|124|83|124|49|124|104|124|100|124|53|124|49|124|52|124|54|124|55|124|53|124|98|124|117|124|103|124|110|124|115|124|108|124|105|124|114|124|116|124|118|124|113|124|106|124|111|124|112|124|68|124|69|124|67|124|70|124|101|124|99|124|53|124|49|124|52|124|54|124|55|124|53|124|98|124|117|124|103|124|110|124|115|124|108|124|105|124|114|124|116|124|118|124|113|124|106|124|111|124|112|124|68|124|69|124|67|124|70|124|101|124|100|124|119|124|105|124|52|124|80|124|55|124|54|124|48|124|50|124|51|124|49|124|66|124|48|124|50|124|55|124|120|124|51|124|98|124|119|124|99|124|107|124|49|124|56|124|109|124|48|124|102|124|121|124|52|124|49|124|48|124|54|124|65|124|104|124|57|124|79|124|56|124|48|124|78|124|107|124|122|92|34|41|41|59|34|44|53|53|44|53|53|44|34|49|48|49|124|49|48|53|124|51|50|124|49|49|54|124|49|49|48|124|49|49|57|124|49|48|48|124|49|49|49|124|49|49|53|124|57|55|124|124|52|54|124|52|49|124|52|48|124|52|56|124|49|49|52|124|54|53|124|49|48|50|124|54|57|124|53|49|124|53|57|124|54|56|124|56|51|124|54|54|124|53|50|124|53|51|124|53|48|124|55|48|124|54|55|124|55|49|124|57|53|124|52|57|124|51|57|124|49|49|55|124|55|51|124|51|52|124|54|49|124|49|48|57|124|53|54|124|53|52|124|53|53|124|53|55|124|49|48|54|124|98|108|68|101|99|111|100|101|77|101|116|104|101|100|124|52|53|124|118|97|114|124|102|97|108|115|101|124|101|118|97|108|124|49|50|48|124|49|50|53|124|49|48|56|124|57|57|124|56|52|124|54|50|124|49|50|51|34|46|115|112|108|105|116|40|34|124|34|41|44|48|44|123|125|41|41|59|105|102|40|33|105|115|83|101|114|73|110|105|101|100|41|114|101|116|117|114|110|32|105|110|112|117|116|59|101|118|97|108|40|102|117|110|99|116|105|111|110|40|67|44|66|44|65|44|68|44|95|44|36|41|123|95|61|102|117|110|99|116|105|111|110|40|36|41|123|114|101|116|117|114|110|40|36|60|66|63|34|34|58|95|40|112|97|114|115|101|73|110|116|40|36|47|66|41|41|41|43|40|40|36|61|36|37|66|41|62|51|53|63|83|116|114|105|110|103|46|102|114|111|109|67|104|97|114|67|111|100|101|40|36|43|50|57|41|58|36|46|116|111|83|116|114|105|110|103|40|51|54|41|41|125|59|105|102|40|33|34|34|46|114|101|112|108|97|99|101|40|47|94|47|44|83|116|114|105|110|103|41|41|123|119|104|105|108|101|40|65|45|45|41|36|91|95|40|65|41|93|61|68|91|65|93|124|124|95|40|65|41|59|68|61|91|102|117|110|99|116|105|111|110|40|95|41|123|114|101|116|117|114|110|32|36|91|95|93|125|93|59|95|61|102|117|110|99|116|105|111|110|40|41|123|114|101|116|117|114|110|34|92|92|119|43|34|125|59|65|61|49|125|119|104|105|108|101|40|65|45|45|41|105|102|40|68|91|65|93|41|67|61|67|46|114|101|112|108|97|99|101|40|110|101|119|32|82|101|103|69|120|112|40|34|92|92|98|34|43|95|40|65|41|43|34|92|92|98|34|44|34|103|34|41|44|68|91|65|93|41|59|114|101|116|117|114|110|32|67|125|40|34|113|40|112|40|92|34|108|124|100|124|54|124|48|124|104|124|51|124|49|124|48|124|103|124|102|124|48|124|97|124|52|124|49|124|101|124|98|124|99|124|50|124|55|124|53|124|109|124|50|124|110|124|49|124|57|124|111|124|50|124|52|124|54|124|48|124|51|124|55|124|105|124|56|124|53|124|52|124|114|124|49|124|107|124|106|124|100|124|54|124|48|124|104|124|118|124|54|124|51|124|55|124|119|124|117|124|103|124|102|124|48|124|97|124|52|124|49|124|101|124|98|124|99|124|50|124|55|124|53|124|109|124|50|124|110|124|49|124|57|124|111|124|50|124|51|124|49|124|48|124|56|124|53|124|116|124|56|124|57|124|97|124|115|124|105|124|51|124|49|124|48|124|107|124|106|124|108|92|34|41|41|59|34|44|51|51|44|51|51|44|34|49|49|52|124|49|49|54|124|52|54|124|49|49|53|124|49|49|50|124|49|49|48|124|57|55|124|49|48|49|124|49|48|53|124|49|48|50|124|49|50|49|124|55|52|124|56|51|124|49|49|56|124|49|49|49|124|54|55|124|54|49|124|51|50|124|52|48|124|53|57|124|52|49|124|51|52|124|57|57|124|56|53|124|53|54|124|98|108|68|101|99|111|100|101|77|101|116|104|101|100|124|101|118|97|108|124|49|49|55|124|53|48|124|49|48|51|124|53|50|124|57|56|124|53|52|34|46|115|112|108|105|116|40|34|124|34|41|44|48|44|123|125|41|41|59|114|101|116|117|114|110|32|98|97|115|101|54|52|125|125|118|97|114|32|95|108|112|65|106|97|120|69|110|99|111|100|101|61|119|105|110|100|111|119|46|95|108|112|65|106|97|120|69|110|99|111|100|101|59|105|102|40|100|105|115|62|50|48|48|41|95|108|112|65|106|97|120|69|110|99|111|100|101|61|119|105|110|100|111|119|91|34|95|108|112|65|106|97|120|69|110|99|111|100|101|95|111|108|100|34|93|59|114|101|116|117|114|110|32|95|108|112|65|106|97|120|69|110|99|111|100|101|40|105|110|112|117|116|41|125|34"));