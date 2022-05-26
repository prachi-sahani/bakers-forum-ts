import React from "react";
import {
  Box,
  Typography,
  Popover,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Checkbox,
  Radio,
  RadioGroup,
} from "../utilities/material-ui/material-components";

interface FilterProps {
  open: boolean;
  id: string | undefined;
  anchorEl: HTMLButtonElement | null;
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>;
}

export function Filters({ open, id, anchorEl, setAnchorEl }: FilterProps) {
  const [state, setState] = React.useState({
    neogcamp: false,
    mba: false,
    business: false,
  });
  const [value, setValue] = React.useState("female");

  const { neogcamp, mba, business } = state;

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };
  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          py: 1.5,
          px: 2.5,
          minWidth: 200,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Filter Posts
        </Typography>
        <Divider />
        <FormControl sx={{ my: 1 }} component="fieldset" variant="standard">
          <FormLabel
            component="legend"
            color="primary"
            sx={{ fontWeight: "600" }}
          >
            Filter by tags
          </FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  sx={{ py: 0.5 }}
                  checked={neogcamp}
                  onChange={handleChange}
                  name="neogcamp"
                />
              }
              label="Neogcamp"
            />
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  sx={{ py: 0.5 }}
                  checked={mba}
                  onChange={handleChange}
                  name="mba"
                />
              }
              label="MBA"
            />
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  sx={{ py: 0.5 }}
                  checked={business}
                  onChange={handleChange}
                  name="business"
                />
              }
              label="Business"
            />
          </FormGroup>
        </FormControl>
        <FormControl>
          <FormLabel
            component="legend"
            color="primary"
            sx={{ fontWeight: "600" }}
            id="sort-by"
          >
            Sort By
          </FormLabel>

          <RadioGroup
            aria-labelledby="sort-by"
            name="controlled-radio-buttons-group"
            value={value}
            onChange={handleChange2}
          >
            <FormControlLabel
              value="latest"
              control={<Radio size="small" sx={{ py: 0.5 }} />}
              label="Latest"
            />
            <FormControlLabel
              value="oldest"
              control={<Radio size="small" sx={{ py: 0.5 }} />}
              label="Oldest"
            />
          </RadioGroup>
        </FormControl>
      </Box>
    </Popover>
  );
}
