<!DOCTYPE html>
<html>
<head>
    <title>Laravel</title>

    <link href="https://fonts.googleapis.com/css?family=Lato:100" rel="stylesheet" type="text/css">

    <style>
        html, body {
            height: 100%;
        }

        *{
            box-sizing: border-box;
        }

        body {
            margin: 0;
            padding: 0;
            width: 100%;
            display: table;
            font-weight: 100;
            font-family: 'Lato';
        }

        .container {
            text-align: center;
            display: table-cell;
            vertical-align: middle;
        }

        .content {
            text-align: center;
            display: inline-block;
        }

        .title {
            font-size: 36px;
            margin-bottom: 25px;
        }

        form{
            padding: 50px 50px 25px;
            min-width: 500px;
            border: 1px solid #eee;
        }

        form > div{
            margin-bottom: 25px;
        }

        input{
            width: 100%;
            padding: 8px 12px;
            border-radius: 2px;
            box-shadow: none;
            font-size: 16px;
            color: #444;
            border: 2px solid #ccc;
        }

        label{
            font-weight: bold;
            display: block;
            text-align: right;
            margin-bottom: 8px;
        }

        button{
            margin-top: 35px;
            background: none;
            border: 2px solid #ccc;
            border-radius: 2px;
            padding: 14px 25px;
            min-width: 150px;
            font-size: 16px;

            transition: all 0.3s;
        }

        button:hover{
            cursor: pointer;
            background-color: #eee;
        }
    </style>
</head>
<body>
<div class="container">
    <div class="content">
        <div class="title">Login to Fundator</div>

        <form method="POST" action="/auth/login">
            {!! csrf_field() !!}

            <div>
                <label for="email">Email</label>
                <input id="email" type="email" name="email" value="{{ old('email') }}">
            </div>

            <div>
                <label for="password">Password</label>
                <input id="password" type="password" name="password" id="password">
            </div>

            <div>
                <button type="submit">Login</button>
            </div>
        </form>
    </div>
</div>
</body>
</html>
