const React=require("react"),SettingsIcon=c=>React.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",width:"1em",height:"1em"},c),React.createElement("path",{fill:c.color,fillRule:"evenodd",d:"M12 10c-1.1046 0-2 .8954-2 2s.8954 2 2 2 2-.8954 2-2-.8954-2-2-2Zm-4 2c0-2.20914 1.79086-4 4-4 2.2091 0 4 1.79086 4 4 0 2.2091-1.7909 4-4 4-2.20914 0-4-1.7909-4-4Z",clipRule:"evenodd"}),React.createElement("path",{fill:c.color,fillRule:"evenodd",d:"M12 2c-.2652 0-.5196.10536-.7071.29289C11.1054 2.48043 11 2.73478 11 3v.17399c-.0021.51681-.1552 1.02173-.4406 1.45262-.2853.43089-.69045.76894-1.16547.97253-.08455.03624-.17351.06055-.26432.07243-.43163.15115-.89628.18841-1.34861.10639-.521-.09447-1.00175-.34284-1.38027-.7131l-.00788-.00771-.05996-.06004c-.09287-.09298-.20355-.16713-.32495-.21746-.1214-.05032-.25152-.07622-.38294-.07622-.13142 0-.26154.0259-.38294.07622-.1214.05033-.23169.12409-.32456.21706l-.00079.00079c-.09297.09287-.16673.20316-.21706.32456-.05032.1214-.07622.25152-.07622.38294 0 .13142.0259.26154.07622.38294.05033.1214.12409.23169.21706.32456l.0682.06819c.37025.37852.61858.85931.71305 1.38031.09259.51063.03317 1.03697-.17051 1.51378-.18556.48655-.51047.90792-.9344 1.21112-.43251.3093-.94807.4814-1.47967.4938L3.09 11.08H3c-.26522 0-.51957.1054-.70711.2929C2.10536 11.5604 2 11.8148 2 12.08c0 .2652.10536.5196.29289.7071.18754.1875.44189.2929.70711.2929h.17399c.51681.0021 1.02173.1552 1.45262.4406.4294.2843.76659.6876.9704 1.1605.21207.4832.2751 1.0187.18095 1.5379-.09447.521-.34284 1.0017-.7131 1.3803l-.00771.0079-.06005.0599c-.09297.0929-.16712.2036-.21745.325-.05032.1214-.07622.2515-.07622.3829 0 .1314.0259.2615.07622.3829.05033.1214.12409.2317.21706.3246l.00079.0008c.09287.093.20316.1667.32456.217.1214.0504.25153.0763.38294.0763.13141 0 .26154-.0259.38294-.0763.1214-.0503.23169-.124.32456-.217l.06819-.0682c.37852-.3703.85931-.6186 1.38031-.7131.51063-.0925 1.03696-.0331 1.51377.1705.48655.1856.90793.5105 1.21113.9345.3093.4325.4814.948.4938 1.4796l.0003.0234V21c0 .2652.1054.5196.2929.7071S11.8148 22 12.08 22c.2652 0 .5196-.1054.7071-.2929s.2929-.4419.2929-.7071v-.174c.0021-.5168.1552-1.0217.4406-1.4526.2844-.4294.6877-.7667 1.1606-.9705.4831-.212 1.0186-.275 1.5378-.1809.521.0945 1.0017.3429 1.3803.7131l.0078.0078.06.06c.0929.093.2036.1671.325.2174.1214.0504.2515.0763.3829.0763.1314 0 .2615-.0259.3829-.0763.1214-.0503.2317-.124.3246-.217l.0008-.0008c.093-.0929.1667-.2032.217-.3246.0504-.1214.0763-.2515.0763-.3829 0-.1314-.0259-.2615-.0763-.3829-.0503-.1214-.124-.2317-.217-.3246l-.0682-.0682c-.3703-.3785-.6186-.8593-.7131-1.3803-.0941-.5192-.0311-1.0547.1809-1.5378.2038-.4729.5411-.8762.9705-1.1606.4309-.2854.9358-.4385 1.4526-.4406H21c.2652 0 .5196-.1054.7071-.2929S22 12.2652 22 12c0-.2652-.1054-.5196-.2929-.7071S21.2652 11 21 11h-.174c-.5168-.0021-1.0217-.1552-1.4526-.4406-.4309-.2853-.7689-.69044-.9725-1.16547-.0363-.08455-.0606-.17351-.0725-.26432-.1511-.43163-.1884-.89629-.1064-1.34861.0945-.521.3429-1.00175.7131-1.38027l.0077-.00788.0601-.05995c.093-.09288.1671-.20356.2174-.32496.0504-.1214.0763-.25153.0763-.38294 0-.13141-.0259-.26154-.0763-.38294-.0503-.1214-.124-.23169-.217-.32456l-.0008-.00079c-.0929-.09297-.2032-.16673-.3246-.21706-.1214-.05032-.2515-.07622-.3829-.07622-.1314 0-.2615.0259-.3829.07622-.1214.05033-.2317.12409-.3246.21706l-.0682.0682c-.3785.37025-.8593.61858-1.3803.71305-.5192.09415-1.0547.03112-1.5379-.18095-.4729-.20381-.8762-.541-1.1605-.9704-.2854-.43089-.4385-.93581-.4406-1.45262V3c0-.26522-.1054-.51957-.2929-.70711C12.5196 2.10536 12.2652 2 12 2Zm7.4 13 .9149.4038c-.0525.1188-.0681.2506-.0449.3784.0229.1264.0827.2431.1719.3355l.0548.0548c-.0001-.0001.0001.0001 0 0 .2788.2785.5003.6097.6512.9737.151.3642.2287.7546.2287 1.1488s-.0777.7846-.2287 1.1488c-.151.3642-.3723.6951-.6512.9737L19.79 19.71l.7075.7067c-.2786.2789-.6095.5002-.9737.6512-.3642.151-.7546.2287-1.1488.2287s-.7846-.0777-1.1488-.2287c-.364-.1509-.6948-.372-.9733-.6508.0001.0001-.0001-.0001 0 0l-.0552-.0552c-.0924-.0892-.2091-.149-.3355-.1719-.1278-.0232-.2596-.0076-.3784.0449l-.0098.0043c-.1166.0499-.216.1328-.2859.2385-.0698.1053-.1073.2286-.1081.3548V21c0 .7957-.3161 1.5587-.8787 2.1213-.5626.5626-1.3256.8787-2.1213.8787-.7957 0-1.5587-.3161-2.12132-.8787C9.39607 22.5587 9.08 21.7957 9.08 21v-.0756c-.00474-.1272-.04673-.2503-.12086-.354-.07588-.106-.18191-.1868-.30432-.2319-.01977-.0072-.03931-.0151-.05858-.0236-.11882-.0525-.25063-.0681-.37842-.0449-.1264.0229-.24315.0827-.33552.1719l-.0548.0548c.00013-.0001-.00013.0001 0 0-.27854.2788-.60966.5003-.97368.6512-.36419.151-.75457.2287-1.14882.2287s-.78463-.0777-1.14882-.2287c-.36385-.1508-.69444-.3718-.97289-.6504-.27893-.2786-.50021-.6095-.65118-.9737-.15098-.3642-.22868-.7546-.22868-1.1488s.0777-.7846.22868-1.1488c.15097-.3642.37225-.6951.65118-.9737l.05482-.0548c.08917-.0924.14902-.2091.17194-.3355.02317-.1278.00753-.2596-.04491-.3784l-.00433-.0098c-.04994-.1166-.1328-.216-.23849-.2859-.10528-.0698-.22858-.1073-.35482-.1081H3c-.79565 0-1.55871-.3161-2.12132-.8787C.316071 13.6387 0 12.8756 0 12.08c0-.7956.316071-1.5587.87868-2.12132C1.44129 9.39607 2.20435 9.08 3 9.08h.07564c.12719-.00474.25027-.04673.35391-.12086.10609-.07588.18689-.18191.23191-.30432.00728-.01977.01517-.03931.02368-.05858.05244-.11882.06808-.25063.04491-.37842-.02292-.1264-.08277-.24314-.17195-.33551l-.05481-.05481c-.27893-.27862-.50021-.60948-.65118-.97368-.15098-.36419-.22868-.75457-.22868-1.14882s.0777-.78463.22868-1.14882c.1509-.36402.37204-.69475.65078-.97329.27854-.27874.60927-.49988.97329-.65078.36419-.15098.75457-.22868 1.14882-.22868s.78463.0777 1.14882.22868c.3642.15097.69506.37225.97368.65118l.05481.05481c.09237.08918.20911.14903.33551.17195.12779.02317.2596.00753.37842-.04491.06403-.02827.13069-.04965.19883-.06392.06972-.04732.12991-.10799.17688-.1789.06972-.10528.10726-.22858.10805-.35482V3c0-.79565.31607-1.55871.87868-2.12132C10.4413.316071 11.2044 0 12 0c.7956 0 1.5587.316071 2.1213.87868C14.6839 1.44129 15 2.20435 15 3v.0875c.0008.12624.0383.24954.1081.35482.0699.10569.1693.1886.2858.23854l.0099.00422c.1188.05244.2506.06814.3784.04497.1264-.02292.2431-.08277.3355-.17194l.0548-.05482c.2786-.27893.6095-.50021.9737-.65118.3642-.15098.7546-.22868 1.1488-.22868s.7846.0777 1.1488.22868c.3642.15097.6951.37225.9737.65118.2786.27845.4996.60904.6504.97289.151.36419.2287.75457.2287 1.14882s-.0777.78463-.2287 1.14882c-.1509.36402-.372.69475-.6508.97328.0001-.00013-.0001.00014 0 0l-.0552.05521c-.0892.09237-.149.20911-.1719.33551-.0232.12779-.0076.2596.0449.37842.0282.06403.0496.13068.0639.19883.0473.06972.108.12991.1789.17688.1053.06972.2286.10726.3548.10805H21c.7957 0 1.5587.31607 2.1213.87868C23.6839 10.4413 24 11.2043 24 12c0 .7957-.3161 1.5587-.8787 2.1213C22.5587 14.6839 21.7957 15 21 15h-.0875c-.1262.0008-.2495.0383-.3548.1081-.1057.0699-.1886.1693-.2386.2858L19.4 15Z",clipRule:"evenodd"}));module.exports=SettingsIcon;