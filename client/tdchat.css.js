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
            top: 50px;
            transition: .2s top, .2s opacity;
        }
        #${data.divUser} figure:hover .user-caption {            
            display:block;
            opacity :1;
            color:white;
            top:30px;
        }

    </style>
`;