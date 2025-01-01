
import { FinkToProtocol } from "../S/5_Etail/5he";
import { SAModule } from "./Nty";

export const classes =  
  {
      grow: {
          flexGrow: 1,
      },
      root: {
          flexGrow: 1,
          backgroundColor: '#fff!important'
      },
      appBar: {
        backgroundColor: '#fff!important',
        position: 'sticky'
      },
      menuButton: {
        // marginRight: theme.spacing(2),
      },
      title: {
        color: '#000000!important',
        
      },
      subtitle: {
        color: '#000',
        fontSize:'.8em!important',
        fontStyle: "italic"
      },
      companyName: {
        flexGrow: 1,
        display: 'flex',
        // flexDirection: 'rơ',
        justifyContent: 'flex-start',
        maxWidth: '200px',
      },
      environment: {
        flexGrow: 1,
        display: 'flex',
        height: '50px',
        verticalAlign: 'middle',
        lineHeight: '10px',
      },
      logo: {
        height:'45px',
        width:'auto'
      },
}

let sitemapId = 1;
export const sitemaps = [
    {
        id: (sitemapId++).toString(),
        name: "PLayground",
        code: "playground",
        link: FinkToProtocol(
            "https://www.figma.com/board/DiwrOCIBu6hmWp1i2C6jtJ/every-things?node-id=6791-6988&t=BFpnlwVd1qwEyGqt-11"
        ),
        open: false,
        active: false,
    } as SAModule,
    {
        id: (sitemapId++).toString(),
        name: "Schedule",
        code: "schedule",
        link: "/schedule",
    } as SAModule,
    {
        id: (sitemapId++).toString(),
        name: "Accounts",
        code: "accounts",
        link: FinkToProtocol(
            "https://www.figma.com/board/DiwrOCIBu6hmWp1i2C6jtJ/every-things?node-id=6801-7204&t=BFpnlwVd1qwEyGqt-11"
        ),
        open: true,
    } as SAModule,
] as SAModule[];
