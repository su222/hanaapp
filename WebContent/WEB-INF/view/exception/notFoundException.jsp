<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c"     uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>부영산전</title>
<style type="text/css">
body {margin:0;}
h1 {margin-left:30px;}
h2 {color:#545454; font-size:14px; background:url('<c:url value="/images/errorDot.gif" />') 0 1px no-repeat; padding:0 0 0 12px;}
.wrap {margin:0 auto; width:770px;}
.eCon {border-top:3px solid #4478a0; border-bottom:2px solid #ccc; padding:40px 20px 0 0; background-image:url('<c:url value="/images/errorBg.jpg" />'); background-repeat:no-repeat; overflow:auto; height:340px;}
.eCon01 {float: right; width: 465px; margin: 0px 0px 0 0;}
.eConText {height:190px; background-color:#f6f6f6; border:1px solid #c9d3e5; padding:20px;}
a {color:#666; text-decoration:none; font-size:11px; line-height:140%; font-family:돋움, 굴림, Arial, sans-serif;}
p.textLink {margin:15px 0 0 0; font-size:11px; color:#7f7f7f;}
p.textLink a {display:none;}
p.textLink a:link,
p.textLink a:visited {color:#666666; text-decoration:none; margin:0 10px 0 20px;}
p.textLink a:hover,
p.textLink a:focus,
p.textLink a:active  {color:#416db3; text-decoration:underline;}
p {margin:0 0 10px 0; line-height:160%; font:Verdana, Geneva, sans-serif; font-size:12px; color:#313131;}
p.eFooter {margin:0; padding:30px 0 10px 0; text-align:center; border-top:1px solid #a3a3a3;}
p.error_txt_tit {font-weight:bold;}
</style>
<script type="text/javascript" src="<c:url value='/js/jquery-1.6.2.min.js' />"></script>
</head>

<body>
<div class="wrap">
    <h1>열배관 관리 시스템</h1>
    <div class="eCon">
        <div class="eCon01">
            <h2>에러메시지</h2>
            <div class="eConText">
                <p class="error_txt_tit">죄송합니다. 요청하신 페이지를 찾을 수 없습니다.</p>
                <p class="error_txt_cont">
                    찾으시려는 페이지의 주소가 잘못 입력되었거나<br />
                    페이지 주소의 변경 혹은 삭제로 인해 현재 사용하실 수 없습니다.<br /><br />

                    입력하신 페이지의 주소가 정확한지 다시 한번 확인 해 주시길 부탁드립니다.<br />
                    관련하여 문의가 있으시면 언제든지, <strong>고객센터( Tel :<a href="tel:1588-5659">1588-5659</a> )로 문의</strong>하여 주십시오. 감사합니다.
                </p>
            </div>
            <p class="textLink">
                <a href="<c:url value='/' />" id="btnHome" target="_self">▶ 나이스데이터 홈으로 가기</a>
<!--
                <a href="#" id="btnBack" target="_self">▶ 이전 페이지로 가기</a>
 -->
                <a href="#" id="btnClose" target="_self">▶ 닫기</a>
            </p>
        </div>
    </div>
    <p class="eFooter">열배관 관리 시스템</p>
</div>
<script language="javascript" type="text/javascript">
    if (window.opener && !window.opener.closed) {
        $('#btnClose').show().click(function() {
            window.close();
        });
    } else {
        $('#btnHome, #btnBack').show();
        $('#btnBack').click(function() {
            if (window.history.length > 1 && document.referrer && document.referrer.indexOf(document.domain) >= 0) {
                window.history.back();
                return true;
            } else {
                location.href = '<c:url value="/" />';
                return false;
            }
        });
    }
</script>
</body>
</html>
