import {Paper,Box,Backdrop,Modal,Fade,Button,Typography,CircularProgress,IconButton} from '@mui/material';
import Slider from '../components/Slider.component'
import modal from '../themes/modal.theme'
import font from "../themes/font.theme"
import hr from "../themes/hr.theme"
import ProductButton from '../components/ProductButton.component'
import { useDispatch, useSelector } from 'react-redux'
import { setProfileModal } from '../store/modals.store'
import CloseIcon from '@mui/icons-material/Close';

const ProfileModal = (props) => {

  const ProfileModalStatus = useSelector(state => state.modals.profileModal)
  const dispatch = useDispatch()
  
  const handleCloseProfileModal = () => {
    dispatch(setProfileModal(false))
  }

  return (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={ProfileModalStatus}
          onClose={handleCloseProfileModal}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
          sx={{boxSizing:'border-box'}}
        >
          <Box sx={{...modal,display:'flex',boxSizing:'border-box',flexDirection:{es:'column',xs:'column',sm:'row',md:'row',lg:'row',xl:'row'},gap:3}}>
            <IconButton
              aria-label="close"
              onClick={handleCloseProfileModal}
              sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  zIndex:333,
                  overrflow:'auto',
                  color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
            <Box>
              
            </Box>
          </Box>
        </Modal>
  );
}

export default ProfileModal