<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="pragma" content="no-cache" />
<meta http-equiv="cache-control" content="no-cache" />
<meta http-equiv="expires" content="0" />
<title>NICE Data</title>
<style type="text/css">
body {margin:0;}
h1 {margin-left:30px;}
h2 {color:#545454; font-size:14px; background:url('<c:url value="/images/errorDot.gif" />') 0 1px no-repeat; padding:0 0 0 12px;}
.wrap {margin:0 auto; width:770px;}
.eCon {border-top:3px solid #4478a0; border-bottom:2px solid #ccc; padding:40px 20px 0 0; background-image:url('<c:url value="/images/errorBg.jpg" />'); background-repeat:no-repeat; overflow:auto; height:340px;}
.eCon01 {float: right; width: 465px; margin: 0px 0px 0 0;}
.eConText {height:190px; background-color:#f6f6f6; border:1px solid #c9d3e5; padding:20px;}
p.textLink {margin:15px 0 0 0; font-size:11px; color:#7f7f7f;}
p.textLink a {display:none;}
p.textLink a:link,
p.textLink a:visited {color:#666666; text-decoration:none;      font-size:11px; line-height:140%; font-family:돋움, 굴림, Arial, sans-serif; margin:0 10px 0 20px;}
p.textLink a:hover,
p.textLink a:focus,
p.textLink a:active  {color:#416db3; text-decoration:underline; font-size:11px; line-height:140%; font-family:돋움, 굴림, Arial, sans-serif;}
p {margin:0 0 10px 0; line-height:160%; font:Verdana, Geneva, sans-serif; font-size:12px; color:#313131;}
p.eFooter {margin:0; padding:30px 0 10px 0; text-align:center; border-top:1px solid #a3a3a3;}
</style>
<script type="text/javascript" src="<c:url value='/js/jquery-1.6.2.min.js' />"></script>
</head>

<body>
<div class="wrap">
    <h1><img src="<c:url value='/images/nicedata_ci.gif' />" alt="나이스데이터" /></h1>
    <div class="eCon">
        <div class="eCon01">
            <h2>에러메시지</h2>
            <div class="eConText"><p><c:out value='${ex_Message}' /></p></div>
            <p class="textLink">
                <a href="<c:url value='/' />" id="btnHome" target="_self">▶ 나이스데이터 홈으로 가기</a>
<!--
                <a href="#" id="btnBack" target="_self">▶ 이전 페이지로 가기</a>
 -->
                <a href="#" id="btnClose" target="_self">▶ 닫기</a>
            </p>
        </div>
    </div>
    <p class="eFooter"><img src="<c:url value='/images/errorFooter.gif' />" alt="나이스데이터" /></p>
</div>
<script type="text/javascript">
    if (window.opener && !window.opener.closed) {
        $('#btnClose').show().click(function() {
            window.close();
        });
    } else if (parent.document.getElementById('frameDialog')) {
        $('#btnClose').show().click(function() {
            window.parent.$.frameDialog.close();
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
