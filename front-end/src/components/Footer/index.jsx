import React from "react";
import "./Footer.scss";
import { Stack, Typography, Box } from "@mui/material";
import { footerLink } from "../../constraints/Footer";

function Footer() {
  return (
    <Box className="Footer">
      <Stack className="block" direction="row">
        <Stack direction='row' padding={5} spacing = {3}>
          {footerLink.supportCustomer.map((item) => (
            <a key={item.id} href={item.link}>
              {item.display}
            </a>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}

export default Footer;
