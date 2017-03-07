 var ItemClass = require('../models/pharmacy/item_class');
 
 
  $(function(){
       $('modal-form').on('submit', function(e){
            e.preventDefault();
            $('#modal-form').submit();
                    $.ajax({
            type: "POST",
            url: "/pharmacy/register",
            data: $("modal-form").serialize(),

            success: function(data, status) {
                 var item_class = new ItemClass({
                  item_class: data,
              }).save(function (err) {
             if (!err) {
            console.log('data saved'+status);
        } else {
            console.log(err);
        }
    }); 
            }
});
       }); 
    });