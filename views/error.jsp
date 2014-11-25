<%@page contentType="text/html;charset=utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<%@include file="../include/meta.jsp" %>
<style>
	* {
		margin:0;
		padding: 0;
	}

	img {
		border:none;
	}

	ul,ol,li {
		list-style: none;
	}
	
	body {
		background: #99a1aa;
	}

	.error {
		width: 960px;
		height: 386px;
		border-radius: 5px;
		border:1px solid #697076;
		background: #fff;
		position: absolute;
		left:50%;
		top:50%;
		margin:-193px 0 0 -480px;
		color:#9099a2;
	}

	.error .left {
		float: left;
		padding-right: 37px;
		margin-left:29px;
	}

	.error .left .code {
		font-size: 170px;
	}

	.error .left .tip {
		font-size: 35px;	
	}

	.error .line {
		float: left;
		width: 1px;
		height: 328px;
		background: #cbcfd3;
		margin-top: 29px;
	}

	.error .right {
		float: left;
		margin:40px 0 0 21px;
		font-size: 48px;
	}

	.error .right p {
		margin-bottom: 10px;
	}

	.error .right a {
		font-size: 30px;
		color:#9099a2;
		text-decoration: none;
	}

	.error .right a:hover {
		color:#9099a2;
		text-decoration: underline;
	}
</style>
<title>error</title>
</head>
<body>	
	<div class="error">
		<div>
			<div class="left">
				<p class="code">Error</p>
				<p class="tip">
					Oops... Page Error !
				</p>
			</div>
			<div class="line"></div>
			<div class="right">
				<p>对不起，无法处理您</p>
				<p>的请求，请重试...</p>
				<a href="<%=basePath%>loginSys/toLoginPage.do">返回首页</a>
			</div>
		</div>
	</div>
</body>
</html>