import React ,{ lazy, Suspense }  from 'react'
import { Routes, Route } from 'react-router-dom';
const HomeLayout = lazy(() => import('../layout/HomeLayout'));
const ChatBotComponent = lazy(() => import('../chatbot/ChatBotComponent'));
const TemplateList = lazy(() => import('../pages/TemplateList'));
const KeyList = lazy(() => import('../pages/KeyList'));
const RoutesRouter = () => {
  return (
    <Routes>
    <Route element={<HomeLayout />}>
        <Route index element={
            <Suspense fallback={"...loading"}>
                <ChatBotComponent />
            </Suspense>
        } />
       
        <Route path='/template-list' element={
            <Suspense fallback={"...loading"}>
                <TemplateList />
            </Suspense>
        } />
        <Route path='/keyword-list' element={
            <Suspense fallback={"...loading"}>
                <KeyList />
            </Suspense>
        } />
        
        
    </Route>
   
</Routes>
  )
}

export default RoutesRouter