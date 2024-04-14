import { Outlet } from "react-router-dom";
import React from "react";
import { Stack } from "@mui/material";
import Logo from "../components/LogoCom";

function BLankLayout() {
  return (
    <Stack minHeight="100vh" justifyContent="center" alignItems="center">
      <Logo sx={{ width: 90, height: 90, mb: 5 }} />
      <Outlet />
    </Stack>
  );
}

export default BLankLayout;
