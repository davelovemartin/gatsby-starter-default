import AWS from 'aws-sdk'

function createInquiryParamsConfig (email, id) {
  return {
    Destination: {
      BccAddresses: [],
      CcAddresses: [],
      ToAddresses: [ email ]
    },
    Message: {
      Body: {
        Html: {
          Data: `
          <!DOCTYPE html>
          <html xmlns:fb="http://www.facebook.com/2008/fbml" xmlns:og="http://opengraph.org/schema/">
            <head>
              <meta property="og:title" content="Order Confirmation"/>
              <meta property="fb:page_id" content="43929265776" />
              <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
              <!-- NAME: 1 COLUMN -->
              <!--[if gte mso 15]>
              <xml>
                <o:OfficeDocumentSettings>
                <o:AllowPNG/>
                <o:PixelsPerInch>96</o:PixelsPerInch>
                </o:OfficeDocumentSettings>
              </xml>
              <![endif]-->
              <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <title>Order Confirmation</title>

                <style type="text/css">
                  p {
                    margin:10px 0;
                    padding:0;
                  }
                  table{
                    border-collapse:collapse;
                  }
                  h1,h2,h3,h4,h5,h6{
                    display:block;
                    margin:0;
                    padding:0;
                  }
                  img,a img{
                    border:0;
                    height:auto;
                    outline:none;
                    text-decoration:none;
                  }
                  body,#bodyTable,#bodyCell{
                    height:100%;
                    margin:0;
                    padding:0;
                    width:100%;
                  }
                  #outlook a{
                    padding:0;
                  }
                  img{
                    -ms-interpolation-mode:bicubic;
                  }
                  table{
                    mso-table-lspace:0pt;
                    mso-table-rspace:0pt;
                  }
                  .ReadMsgBody{
                    width:100%;
                  }
                  .ExternalClass{
                    width:100%;
                  }
                  p,a,li,td,blockquote{
                    mso-line-height-rule:exactly;
                  }
                  a[href^=tel],a[href^=sms]{
                    color:inherit;
                    cursor:default;
                    text-decoration:none;
                  }
                  p,a,li,td,body,table,blockquote{
                    -ms-text-size-adjust:100%;
                    -webkit-text-size-adjust:100%;
                  }
                  .ExternalClass,.ExternalClass p,.ExternalClass td,.ExternalClass div,.ExternalClass span,.ExternalClass font{
                    line-height:100%;
                  }
                  a[x-apple-data-detectors]{
                    color:inherit !important;
                    text-decoration:none !important;
                    font-size:inherit !important;
                    font-family:inherit !important;
                    font-weight:inherit !important;
                    line-height:inherit !important;
                  }
                  #bodyCell{
                    padding:10px;
                  }
                  .templateContainer{
                    max-width:600px !important;
                  }
                  a.mcnButton{
                    display:block;
                  }
                  .mcnImage{
                    vertical-align:bottom;
                  }
                  .mcnTextContent{
                    word-break:break-word;
                  }
                  .mcnTextContent img{
                    height:auto !important;
                  }
                  .mcnDividerBlock{
                    table-layout:fixed !important;
                  }
                  body,#bodyTable{
                    background-color:#e9ddd4;
                  }
                  #bodyCell{
                    border-top:0;
                  }
                  .templateContainer{
                    border:0;
                  }
                  h1{
                    color:#202020;
                    font-family:Helvetica;
                    font-size:26px;
                    font-style:normal;
                    font-weight:bold;
                    line-height:125%;
                    letter-spacing:normal;
                    text-align:left;
                  }
                  h2{
                    color:#202020;
                    font-family:Helvetica;
                    font-size:22px;
                    font-style:normal;
                    font-weight:bold;
                    line-height:125%;
                    letter-spacing:normal;
                    text-align:left;
                  }
                  h3{
                    color:#202020;
                    font-family:Helvetica;
                    font-size:20px;
                    font-style:normal;
                    font-weight:bold;
                    line-height:125%;
                    letter-spacing:normal;
                    text-align:left;
                  }
                  h4{
                    color:#202020;
                    font-family:Helvetica;
                    font-size:18px;
                    font-style:normal;
                    font-weight:bold;
                    line-height:125%;
                    letter-spacing:normal;
                    text-align:left;
                  }
                  #templatePreheader{
                    background-color:#231f20;
                    border-top:0;
                    border-bottom:0;
                    padding-top:9px;
                    padding-bottom:9px;
                  }
                  #templatePreheader .mcnTextContent,#templatePreheader .mcnTextContent p{
                    color:#fefefe;
                    font-family:Helvetica;
                    font-size:12px;
                    line-height:150%;
                    text-align:left;
                  }
                  #templatePreheader .mcnTextContent a,#templatePreheader .mcnTextContent p a{
                    color:#fefefe;
                    font-weight:normal;
                    text-decoration:underline;
                  }
                  #templateHeader{
                    background-color:#FFFFFF;
                    border-top:0;
                    border-bottom:0;
                    padding-top:px;
                    padding-bottom:px;
                  }
                  #templateHeader .mcnTextContent,#templateHeader .mcnTextContent p{
                    color:#fefefe;
                    font-family:Helvetica;
                    font-size:16px;
                    line-height:150%;
                    text-align:left;
                  }
                  #templateHeader .mcnTextContent a,#templateHeader .mcnTextContent p a{
                    color:#2BAADF;
                    font-weight:normal;
                    text-decoration:underline;
                  }
                  #templateBody{
                    background-color:#fbffff;
                    border-top:0;
                    border-bottom:2px solid #EAEAEA;
                    padding-top:0;
                    padding-bottom:9px;
                  }
                  #templateBody .mcnTextContent,#templateBody .mcnTextContent p{
                    color:#202020;
                    font-family:Helvetica;
                    font-size:16px;
                    line-height:150%;
                    text-align:left;
                  }
                  #templateBody .mcnTextContent a,#templateBody .mcnTextContent p a{
                    color:#2BAADF;
                    font-weight:normal;
                    text-decoration:underline;
                  }
                  #templateFooter{
                    background-color:#FAFAFA;
                    border-top:0;
                    border-bottom:0;
                    padding-top:9px;
                    padding-bottom:9px;
                  }
                  #templateFooter .mcnTextContent,#templateFooter .mcnTextContent p{
                    color:#656565;
                    font-family:Helvetica;
                    font-size:12px;
                    line-height:150%;
                    text-align:center;
                  }
                  #templateFooter .mcnTextContent a,#templateFooter .mcnTextContent p a{
                    color:#656565;
                    font-weight:normal;
                    text-decoration:underline;
                  }
                @media only screen and (min-width:768px){
                  .templateContainer{
                    width:600px !important;
                  }

                }	@media only screen and (max-width: 480px){
                  body,table,td,p,a,li,blockquote{
                    -webkit-text-size-adjust:none !important;
                  }

                }	@media only screen and (max-width: 480px){
                  body{
                    width:100% !important;
                    min-width:100% !important;
                  }

                }	@media only screen and (max-width: 480px){
                  #bodyCell{
                    padding-top:10px !important;
                  }

                }	@media only screen and (max-width: 480px){
                  .mcnImage{
                    width:100% !important;
                  }

                }	@media only screen and (max-width: 480px){
                  .mcnCartContainer,.mcnCaptionTopContent,.mcnRecContentContainer,.mcnCaptionBottomContent,.mcnTextContentContainer,.mcnBoxedTextContentContainer,.mcnImageGroupContentContainer,.mcnCaptionLeftTextContentContainer,.mcnCaptionRightTextContentContainer,.mcnCaptionLeftImageContentContainer,.mcnCaptionRightImageContentContainer,.mcnImageCardLeftTextContentContainer,.mcnImageCardRightTextContentContainer{
                    max-width:100% !important;
                    width:100% !important;
                  }

                }	@media only screen and (max-width: 480px){
                  .mcnBoxedTextContentContainer{
                    min-width:100% !important;
                  }

                }	@media only screen and (max-width: 480px){
                  .mcnImageGroupContent{
                    padding:9px !important;
                  }

                }	@media only screen and (max-width: 480px){
                  .mcnCaptionLeftContentOuter .mcnTextContent,.mcnCaptionRightContentOuter .mcnTextContent{
                    padding-top:9px !important;
                  }

                }	@media only screen and (max-width: 480px){
                  .mcnImageCardTopImageContent,.mcnCaptionBlockInner .mcnCaptionTopContent:last-child .mcnTextContent{
                    padding-top:18px !important;
                  }

                }	@media only screen and (max-width: 480px){
                  .mcnImageCardBottomImageContent{
                    padding-bottom:9px !important;
                  }

                }	@media only screen and (max-width: 480px){
                  .mcnImageGroupBlockInner{
                    padding-top:0 !important;
                    padding-bottom:0 !important;
                  }

                }	@media only screen and (max-width: 480px){
                  .mcnImageGroupBlockOuter{
                    padding-top:9px !important;
                    padding-bottom:9px !important;
                  }

                }	@media only screen and (max-width: 480px){
                  .mcnTextContent,.mcnBoxedTextContentColumn{
                    padding-right:18px !important;
                    padding-left:18px !important;
                  }

                }	@media only screen and (max-width: 480px){
                  .mcnImageCardLeftImageContent,.mcnImageCardRightImageContent{
                    padding-right:18px !important;
                    padding-bottom:0 !important;
                    padding-left:18px !important;
                  }

                }	@media only screen and (max-width: 480px){
                  .mcpreview-image-uploader{
                    display:none !important;
                    width:100% !important;
                  }

                }	@media only screen and (max-width: 480px){
                  h1{
                    font-size:22px !important;
                    line-height:125% !important;
                  }

                }	@media only screen and (max-width: 480px){
                  h2{
                    font-size:20px !important;
                    line-height:125% !important;
                  }

                }	@media only screen and (max-width: 480px){
                  h3{
                    font-size:18px !important;
                    line-height:125% !important;
                  }

                }	@media only screen and (max-width: 480px){
                  h4{
                    font-size:16px !important;
                    line-height:150% !important;
                  }

                }	@media only screen and (max-width: 480px){
                  .mcnBoxedTextContentContainer .mcnTextContent,.mcnBoxedTextContentContainer .mcnTextContent p{
                    font-size:14px !important;
                    line-height:150% !important;
                  }

                }	@media only screen and (max-width: 480px){
                  #templatePreheader{
                    display:block !important;
                  }

                }	@media only screen and (max-width: 480px){
                  #templatePreheader .mcnTextContent,#templatePreheader .mcnTextContent p{
                    font-size:14px !important;
                    line-height:150% !important;
                  }

                }	@media only screen and (max-width: 480px){
                  #templateHeader .mcnTextContent,#templateHeader .mcnTextContent p{
                    font-size:16px !important;
                    line-height:150% !important;
                  }

                }	@media only screen and (max-width: 480px){
                  #templateBody .mcnTextContent,#templateBody .mcnTextContent p{
                    font-size:16px !important;
                    line-height:150% !important;
                  }

                }	@media only screen and (max-width: 480px){
                  #templateFooter .mcnTextContent,#templateFooter .mcnTextContent p{
                    font-size:14px !important;
                    line-height:150% !important;
                  }
                }
                </style>
            </head>
            <body style="height: 100%;margin: 0;padding: 0;width: 100%;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background-color: #e9ddd4;">
              <center>
                <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;height: 100%;margin: 0;padding: 0;width: 100%;background-color: #e9ddd4;">
                  <tr>
                    <td align="center" valign="top" id="bodyCell" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;height: 100%;margin: 0;padding: 10px;width: 100%;border-top: 0;">
                          <!-- BEGIN TEMPLATE // -->
              						<!--[if gte mso 9]>
              						      <table align="center" border="0" cellspacing="0" cellpadding="0" width="600" style="width:600px;">
              						            <tr>
              						                  <td align="center" valign="top" width="600" style="width:600px;">
              						<![endif]-->
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" class="templateContainer" style="border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;border: 0;max-width: 600px !important;">
                        <tr>
                          <td valign="top" id="templatePreheader" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background-color: #231f20;border-top: 0;border-bottom: 0;padding-top: 9px;padding-bottom: 9px;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                              <tbody class="mcnTextBlockOuter">
                                <tr>
                                  <td valign="top" class="mcnTextBlockInner" style="padding-top: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                  	<!--[if mso]>
                            				<table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
                            				<tr>
                            				<![endif]-->

                            				<!--[if mso]>
                            				<td valign="top" width="390" style="width:390px;">
                            				<![endif]-->
                                      <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width: 390px;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" width="100%" class="mcnTextContentContainer">
                                        <tbody>
                                          <tr>
                                            <td valign="top" class="mcnTextContent" style="padding: 0px 18px 9px;color: #EFEFEF;font-family: &quot;Helvetica Neue&quot;, Helvetica, Arial, Verdana, sans-serif;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;word-break: break-word;font-size: 12px;line-height: 150%;text-align: left;">
                                              <p>Thank you for answering the Call of the Brave 👊🏼 </p>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                              				<!--[if mso]>
                              				</td>
                              				<![endif]-->

                              				<!--[if mso]>
                              				<td valign="top" width="210" style="width:210px;">
                              				<![endif]-->

                              				<!--[if mso]>
                              				</td>
                              				<![endif]-->

                              				<!--[if mso]>
                              				</tr>
                              				</table>
                              				<![endif]-->
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td valign="top" id="templateHeader" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background-color: #FFFFFF;border-top: 0;border-bottom: 0;padding-top: px;padding-bottom: px;">
                              <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnImageBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                <tbody class="mcnImageBlockOuter">
                                  <tr>
                                    <td valign="top" style="padding: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" class="mcnImageBlockInner">
                                      <table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" class="mcnImageContentContainer" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                        <tbody>
                                          <tr>
                                            <td class="mcnImageContent" valign="top" style="padding-right: 9px;padding-left: 9px;padding-top: 0;padding-bottom: 0;text-align: center;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                              <img align="center" alt="" src="https://www.callofthebrave.org/images/mailheader.png" width="564" style="max-width: 800px;padding-bottom: 0;display: inline !important;vertical-align: bottom;border: 0;height: auto;outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;" class="mcnImage">
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td valign="top" id="templateBody" style="mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;background-color: #fbffff;border-top: 0;border-bottom: 2px solid #EAEAEA;padding-top: 0;padding-bottom: 9px;">
                              <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                                <tbody class="mcnTextBlockOuter">
                                  <tr>
                                    <td valign="top" class="mcnTextBlockInner" style="padding-top: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                              	<!--[if mso]>
                          				<table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
                          				<tr>
                        				<![endif]-->

                        				<!--[if mso]>
                          				<td valign="top" width="600" style="width:600px;">
                        				<![endif]-->
                                      <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width: 100%;min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" width="100%" class="mcnTextContentContainer">
                                        <tbody>
                                          <tr>
                                            <td valign="top" class="mcnTextContent" style="padding: 0px 18px 9px;color: #231F20;font-family: &quot;Helvetica Neue&quot;, Helvetica, Arial, Verdana, sans-serif;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;word-break: break-word;font-size: 16px;line-height: 150%;text-align: left;">
                                              <h1 class="null" style="display: block;margin: 0;padding: 0;color: #202020;font-family: Helvetica;font-size: 18px;font-style: normal;font-weight: bold;line-height: 125%;letter-spacing: normal;text-align: left;"><strong><span style="font-family:arial,helvetica neue,helvetica,sans-serif">Thank you for your order on <a href="https://www.callofthebrave.org">callofthebrave.org</a>. Your order number is ${id}.</span></strong></h1>
                                              <p style="color: #231F20;font-family: &quot;Helvetica Neue&quot;, Helvetica, Arial, Verdana, sans-serif;margin: 10px 0;padding: 0;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;font-size: 16px;line-height: 150%;text-align: left;">Just a quick note to say we've got your order and your t-shirt will be on its way to you as soon as possible.</p>
                                              <p>If you have any queries, please write to <a href="mailto:hello@callofthebrave.org">hello@callofthebrave.org</a>.</p>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                              				<!--[if mso]>
                              				  </td>
                              				<![endif]-->

                              				<!--[if mso]>
                              				  </tr>
                              				    </table>
                              				<![endif]-->
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table border="0" cellpadding="0" cellspacing="0" width="100%" class="mcnTextBlock" style="min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                  <tbody class="mcnTextBlockOuter">
                    <tr>
                      <td valign="top" class="mcnTextBlockInner" style="padding-top: 9px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
                	<!--[if mso]>
          				    <table align="left" border="0" cellspacing="0" cellpadding="0" width="100%" style="width:100%;">
          				        <tr>
          				<![endif]-->
          				<!--[if mso]>
          				    <td valign="top" width="600" style="width:600px;">
          				<![endif]-->
                        <table align="left" border="0" cellpadding="0" cellspacing="0" style="max-width: 100%;min-width: 100%;border-collapse: collapse;mso-table-lspace: 0pt;mso-table-rspace: 0pt;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;" width="100%" class="mcnTextContentContainer">
                          <tbody>
                            <tr>
                              <td valign="top" class="mcnTextContent" style="padding-top: 0;padding-right: 18px;padding-bottom: 9px;padding-left: 18px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;word-break: break-word;color: #656565;font-family: Helvetica;font-size: 12px;line-height: 150%;text-align: center;">
                                <em>Copyright © 2017 Call of the Brave Limited, All rights reserved.</em>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                				<!--[if mso]>
                				  </td>
                				<![endif]-->

                				<!--[if mso]>
                				  </tr>
                				    </table>
                				<![endif]-->
                      </td>
                    </tr>
                  </tbody>
                </table>

          						<!--[if gte mso 9]>
          						    </td>
          						        </tr>
          						    </table>
          						<![endif]-->
                      <!-- // END TEMPLATE -->

              </center>
            </body>
          </html>

         `,
          Charset: 'UTF-8'
        }
      },
      Subject: {
        Data: 'Your Order Details ' + email,
        Charset: 'UTF-8'
      }
    },
    Source: 'hello@callofthebrave.org',
    ReplyToAddresses: [ 'hello@callofthebrave.org' ],
    ReturnPath: 'hello@callofthebrave.org'
  }
}

module.exports.handler = (event, context, callback) => {
  const requestBody = JSON.parse(event.body)
  const email = requestBody.email
  const id = requestBody.id

  const ses = new AWS.SES({
    region: 'eu-west-1'
  })

  const params = createInquiryParamsConfig(email, id)

  ses.sendEmail(params, function (error, data) {
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    }

    if (error) {
      const response = {
        statusCode: 500,
        headers: headers,
        body: JSON.stringify({ status: false })
      }
      console.log(error, error.stack)
      callback(null, response)
      return
    }

    const response = {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify(params)
    }
    callback(null, response)
  })
}
