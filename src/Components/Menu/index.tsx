import Button from '@mui/material/Button';
import { Menu as MenuMaterial  } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { DotsThreeVertical } from 'phosphor-react';

import { Container } from "./styles";
import { useState } from "react";


const Menu = () => {

    const [openMenu, setOpenMenu] = useState<null | HTMLElement>(null);
    const open = Boolean(openMenu);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setOpenMenu(event.currentTarget);
    };
    const handleClose = () => {
        setOpenMenu(null);
    };

    return(
        <Container>
            <Button
                id="basic-button-menu"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <DotsThreeVertical size={32} />
            </Button>
            <MenuMaterial
                id="basic-menu"
                anchorEl={openMenu}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                'aria-labelledby': 'basic-button-menu',
                }}
            >
                <MenuItem onClick={handleClose}>
                    Editar
                </MenuItem>
            </MenuMaterial>
        </Container>
    )
}

export default Menu;