import styled from "@emotion/styled";
import { useNavigationStore } from "./store/NavigationStore";
import { Drawer } from "@mui/material";
import { Route, Routes } from 'react-router-dom'

import { SideMenu } from "./SideMenu";
import LoginContainer from "../Login/LoginContainer";

export const SideNavRoot = styled('div')({
  //flexGrow: 1,
  backgroundColor: '#f6f6f6',
  display: 'flex',
  width: '100%',
  height: '100%',
  flexDirection: 'row',
  flexGrow: 1,
  '& .expanded': {
    transitionDuration: '500ms',
    width: '200px',
    '& div.expander': {
      flexDirection: 'row-reverse'
    }
  },
  '& .collapsed': {
    transitionDuration: '500ms',
    width: '48px',
    '& div.expander': {
      flexDirection: 'row',
    }
  },
  '& .MuiDrawer-paperAnchorDockedLeft': {
    top: '64px!important',
    //width: '227px',
    background: '#36454f',
    flex: '0 0 auto',
    '& .MuiListItemButton-root': {
      backgroundcolor: '#36454f!important',
      color: '#fff!important',
    }
  },
  '& .MuiList-root': {
    backgroundColor: '#36454f!important',
  },
  '& nav.MuiList-root': {
    marginBottom: '75px',
  },
  '& .MuiTypography-root': {
    fontSize: '.95em'
  },
  '& ul li a.MuiListItem-root.active': {
    backgroundColor: 'rgb(0 0 0 / 30%)!important',
  }
})

export const BodyWrapper = styled('div')({
  display: 'flex',
  flexGrow: 1,
  width: '100%',
  height: '100%',
})

const SideNavigation: React.FC<React.PropsWithChildren<React.PropsWithChildren<unknown>>> = () => {
  const { expanded, sideNavigationRef, bodyWrapperRef, moduleName } = useNavigationStore();
 
  return (
    <>
      <SideNavRoot className={`side-tabs`}>
          <Drawer
            ref={sideNavigationRef}
            variant="permanent"
            className={`side-navigation ${(expanded ?? false) === true ? "expanded" : "collapsed"}`}
            style={{
              transitionDuration: '500ms',
              position: 'relative',
              whiteSpace: 'nowrap',
              //width: '227px',
              paddingBottom: '40px',
              backgroundColor: '#36454f',
              zIndex: 1,
              display: 'flex',
            }}
          >
            <SideMenu />
          </Drawer>
        <BodyWrapper
          className='body-wrapper'
          ref={bodyWrapperRef} >
          <Routes>
              <Route path="/login" Component={LoginContainer} />
              <Route path="/signup" Component={LoginContainer} />
          </Routes>
        </BodyWrapper>
      </SideNavRoot>
    </>
  )
}

export default SideNavigation;