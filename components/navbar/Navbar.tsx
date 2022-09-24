import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Button, ClickAwayListener, Tooltip } from "@mui/material";
import Logo from "../../public/ebc_logo_small.gif";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Navbar = () => {
  const router = useRouter();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleTooltipOpen = () => {
    setTooltipOpen(true);
  };
  const handleTooltipClose = () => {
    setTooltipOpen(false);
  };

  const handleSearch = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();

      if (searchText.length > 1) {
        handleTooltipClose();
        router.push(`/search/${encodeURIComponent(searchText)}`).then(null);
      } else {
        handleTooltipOpen();
      }
    }
  };

  const pages = ["Bronze", "Silver", "Gold", "Pro"];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary" aria-label="Navbar">
        <Toolbar>
          <Box>
            <Image
              layout="fixed"
              width={75}
              height={50}
              src={Logo}
              alt="Logo"
              aria-label="Logo"
            />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              aria-label="menu"
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <Link key="index" href={`/`}>
                <MenuItem key="index" onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Home</Typography>
                </MenuItem>
              </Link>
              {pages.map((page) => (
                <Link
                  key={page}
                  href={`/${encodeURIComponent(page.toLowerCase())}`}
                >
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Link key="index" href={`/`}>
              <Button
                key="index"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Home
              </Button>
            </Link>
            {pages.map((page) => (
              <Link
                key={page}
                href={`/${encodeURIComponent(page.toLowerCase())}`}
              >
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              </Link>
            ))}
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <ClickAwayListener onClickAway={handleTooltipClose}>
            <Tooltip
              title="Search must be at least 2 characters"
              open={tooltipOpen}
              onClose={handleTooltipClose}
              onOpen={handleTooltipOpen}
              disableFocusListener
              disableHoverListener
              disableTouchListener
              arrow
            >
              <Search aria-label="Search">
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search name…"
                  inputProps={{ "aria-label": "search" }}
                  onChange={(event) => setSearchText(event.target.value)}
                  onKeyDown={handleSearch}
                />
              </Search>
            </Tooltip>
          </ClickAwayListener>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
