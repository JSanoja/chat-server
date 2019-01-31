const tdChatCss = (data) => `
    <style>
        #${data.divUser} {
            text-align:right;  
            padding-right: 25px; 
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
        }
        #${data.divChat} .td-chat-to {
            width:200px;
            float:right;
            border: 2px solid #1262b3;
            padding: 0 10px 5px;
            position:relative;            
            margin: 0 10px;
            background-color: #FAFAFA;
            border-bottom: 0px;
        }
        #${data.divChat} .td-chat-to .td-chat-header {
            margin-left: -10px;
            margin-right: -10px;
            background-color: #1262b3;
            padding: 5px;
            height: 15px;
            position:relative;
        }
        #${data.divChat} .td-chat-to .td-chat-header .td-chat-close {
            position:absolute;
            right:5px;
            top:4px;
            color:white;
            cursor:pointer;
        }
        #${data.divChat} .td-chat-to .td-chat-header .td-chat-close svg{
            width: 9px;    
        }        
        #${data.divChat} .td-chat-to .td-chat-header h2 {
            position:absolute;
            left:5px;
            top:5px;
            color:white;
            font-size: 12px;
            margin:0;
        }
        #${data.divChat} .td-chat-to .td-chat-area {
            width:100%;
            height: 190px;
        }
        #${data.divChat} .td-chat-to .td-chat-input {
            width: 165px;
            padding: 4px 8px;
            padding-right: 25px;           
        }
        #${data.divChat} .td-chat-to .td-chat-send {
            position:absolute;
            bottom: 5px;
            right: 11px;
            color: #0e4e8f;
            transition: .2s color;
            cursor:pointer;
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