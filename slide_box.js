<!-- SLIDEBOX START -->
<script type="text/javascript">
$(function() {
  var slidebox = $('#slidebox');
  if (slidebox.length>0) {
    $(window).scroll(function(){
        var distanceTop = $('#last').offset().top - $(window).height(),
            halfDistanceTop = distanceTop/2,
            halfWindowWidth = $(window).width()/2,
            slideboxWidth = slidebox.width(),
            leftPadding = slidebox.css('padding-left').replace('px',''),
            rightPadding = slidebox.css('padding-right').replace('px',''),
            totalPadding = parseInt(leftPadding) + parseInt(rightPadding),
            distanceToCenter = halfWindowWidth - slideboxWidth/2 - totalPadding/2;

        if  ($(window).scrollTop() > halfDistanceTop){
            slidebox.animate({'right': distanceToCenter},300);
        }
        else{
            slidebox.stop(true).animate({'right':'-430px'},100);
        }
    });
    $('#slidebox .close').on('click',function(){
        $(this).parent().remove();
    });
  }
});
</script>
<!-- SLIDEBOX END -->
