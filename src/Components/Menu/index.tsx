import Button from '@mui/material/Button';
import { Menu as MenuMaterialUi } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { DotsThreeVertical, DownloadSimple } from 'phosphor-react';

import { useState } from 'react';
import { Container } from "./styles";

interface MenuProps {
    onClick: (data: any) => void;
}

const Menu = ({ onClick }: MenuProps) => {

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
            <div>
                <Button
                    color='secondary'
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    <DotsThreeVertical size={32} />
                </Button>
                <MenuMaterialUi
                    id="basic-menu"
                    anchorEl={openMenu}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                    'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem title='Fazer download da logo' onClick={handleClose}>
                        <DownloadSimple size={32} />
                        <a onClick={onClick}>
                            <span>Download Logo</span>
                        </a>
                    </MenuItem>
                </MenuMaterialUi>
            </div>
        </Container>
    )
}

export default Menu;