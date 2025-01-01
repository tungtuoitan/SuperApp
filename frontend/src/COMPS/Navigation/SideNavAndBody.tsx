import styled from "@emotion/styled";
import { useNavigationStore } from "./NavigationStore";
import { Drawer } from "@mui/material";
import { Route, Routes } from 'react-router-dom'
import { SideMenu } from "./SideMenu";
import LoginContainer from "../Login/LoginContainer";
import { SnackbarKey, SnackbarProvider } from "notistack";
import { CloseNotiBtn } from "../CommonHelpers/1_CloseNotiBtn";
import {TLAllTabs} from "../S/6_AllTabs/TLAllTabs";
import {BodyWrapper, SideNavRoot} from "./Nui";



const SideNavAndBody: React.FC<React.PropsWithChildren<React.PropsWithChildren<unknown>>> = () => {
  const { expanded, sideNavigationRef, bodyWrapperRef, moduleName } = useNavigationStore();
 
  return (
    <>
      <SideNavRoot className={`side-tabs`} 
      style={{
        // border: '4px solid blue',
        height: 'calc(100% - 64px)',

        }}>
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
          ref={bodyWrapperRef}
          style={{
            width: expanded ? 'calc(100% - 200px)' : 'calc(100% - 48px)',
            // border: '4px solid red',
          }}>
            <SnackbarProvider action={(id: SnackbarKey) => <CloseNotiBtn id={id} />} autoHideDuration={3000}>
                <Routes>
                    <Route path="/login" Component={LoginContainer} />
                    <Route path="/signup" Component={LoginContainer} />
                    <Route path="/schedule" Component={TLAllTabs} />
                </Routes>
            </SnackbarProvider>
        </BodyWrapper>
      </SideNavRoot>
    </>
  )
}

export default SideNavAndBody;