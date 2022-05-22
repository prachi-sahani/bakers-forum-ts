import {
  Box,
  IconButton,
  Tooltip,
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
} from "../utilities/material-components";
import { Discussion } from "../types/Discussion";
import { DiscussionCard } from "./DiscussionCard";
import { FilterListIcon } from "../utilities/material-icons";
import React from "react";

const discussions: Discussion[] = [
  {
    id: 1,
    title: "Join InvactHQ for MBA",
    description: `Non programmers on my timeline. Attention! 
      After placing 100+ programmers in Indian startups, I am thinking of coming up with a program for business roles as well. 
      Intereseted in helping me build this course? Join the telegram group.`,
    postedBy: "@tanaypratap",
    votes: 300,
    tags: ["neogcamp"],
    time: 1,
  },
  {
    id: 2,
    title: "Join InvactHQ for MBA",
    description: `Non programmers on my timeline. Attention! 
      After placing 100+ programmers in Indian startups, I am thinking of coming up with a program for business roles as well. 
      Intereseted in helping me build this course? Join the telegram group.`,
    postedBy: "@tanaypratap",
    votes: 300,
    tags: ["MBA", "Business"],
    time: 1,
  },
];

export function DiscussionCardsSection({ title }: { title: string }) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const [state, setState] = React.useState({
    neogcamp: false,
    mba: false,
    business: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };
  const [value, setValue] = React.useState("female");

  const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const { neogcamp, mba, business } = state;

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Box sx={{ p: 1, display: "flex", flexDirection: "column", gap: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">{title}</Typography>
        <Tooltip title="Filters">
          <IconButton
            aria-label="filter"
            aria-describedby={id}
            onClick={handleClick}
          >
            <FilterListIcon />
          </IconButton>
        </Tooltip>
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
      </Box>
      {discussions.map((disc) => (
        <DiscussionCard discussion={disc} key={disc.id} />
      ))}
    </Box>
  );
}
