const tdChatCss = (data) => `
    <style>
        #${data.divUser} {
            text-align:right;  
            padding-right: 25px; 
            font-family: 'Open Sans', sans-serif;
        }
        #${data.divUser} figure {
            width:30px;
            height:30px;
            margin: 5px 10px;
            margin-left:10px;
            border-radius:15px;
            border:2px solid #01579b;
            box-shadow: 0 0 2px 0 gray;
            display: inline-block;
            background-position: center;
            background-size: contain;   
            position: relative; 
            cursor:pointer;        
        }
        #${data.divUser} figure .user-caption {
            display:block;
            opacity:0;
            position:absolute;
            background-color: black;
            padding: 4px;
            width:100px;            
            z-index: 2;
            margin-left: -40px;
            text-align:center;
            border-radius:4px;
            font-family: sans;
            font-size:11px;            
            top: 35px;
            transition: .2s top, .2s opacity;
        }
        #${data.divUser} figure:hover .user-caption {            
            display:block;
            opacity :1;
            color:white;
            top:30px;
        }
        #${data.divChat}  {            
            display:block;
            position:fixed;
            bottom:0;
            right:0;
            font-family: 'Open Sans', sans-serif;
        }
        #${data.divChat} .td-chat-to {
            width:200px;
            vertical-align: bottom;
            display: inline-block;
            border: 2px solid #1262b3;
            padding: 0;
            position:relative;            
            margin: 0 10px 0 0;
            background-color: #FAFAFA;
            border-bottom: 0px;
        }
        #${data.divChat} .td-chat-to .td-chat-header {
            margin-left: 0px;
            margin-right: 0px;
            background-color: #1262b3;
            padding: 5px;
            height: 15px;
            position:relative;
        }
        #${data.divChat} .td-chat-to .td-chat-header .td-chat-close {
            position:absolute;
            right:5px;
            top:2px;
            color:white;
            cursor:pointer;
        }
        #${data.divChat} .td-chat-to .td-chat-header .td-chat-close svg{
            width: 9px;    
        }
        #${data.divChat} .td-chat-to .td-chat-header .td-chat-min-max {
            position:absolute;
            right:25px;
            top:0px;
            color:white;
            cursor:pointer;
        }
        #${data.divChat} .td-chat-to .td-chat-header .td-chat-min-max svg{
            width: 10px;    
        }
        #${data.divChat} .td-chat-to .td-chat-header .td-chat-min-max svg[data-icon*=minimize] {         
            position: relative;
            top: -3px;
        }        
        #${data.divChat} .td-chat-to .td-chat-header h2 {
            position:absolute;
            left:5px;
            top:5px;
            color:white;
            font-size: 10px;
            margin:0;
        }
        #${data.divChat} .td-chat-to .td-chat-area {
            width: calc(100% - 12px);
            height: 190px;
            margin-bottom: 0px;
            overflow-y: scroll;
            padding: 5px 6px 0;
        }
        #${data.divChat} .td-chat-to .td-message {
            width: 140px;
            margin-bottom: 5px;
            border-radius: 5px;
            padding: 10px;
            font-size: 11px;           
        }
        #${data.divChat} .td-chat-to .td-message.me {
            background-color: #e5e5e5;
        }
        #${data.divChat} .td-chat-to .td-message.not-me {
            background-color: white;
            margin-left: auto;
        }
        #${data.divChat} .td-chat-to .td-chat-input {
            width: 166px;
            padding: 7px 8px;
            padding-right: 25px;
            margin-left: 1px;
            border: none;
            margin-bottom: 0px;
            border-top: 1px solid #f1f1f1;         
        }
        #${data.divChat} .td-chat-to .td-chat-send {
            position: absolute;
            bottom: 0px;
            right: 6px;
            color: #0e4e8f;
            transition: .2s color;
            cursor: pointer;
        }
        #${data.divChat} .td-chat-to .td-chat-send:hover {
            color: #1262b3;
        }
        #${data.divChat} .td-chat-to .td-chat-send svg {
            width: 20px;
            height : 20px;
        }
        

    </style>
`;