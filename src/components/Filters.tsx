import React, { useEffect } from "react";
import { useAppSelector } from "../redux/customHook";
import { RootState } from "../redux/store";
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
  tagFilters: string[];
  updateFilter: (tag: string, action: string) => void;
  sortBy: string;
  updateSortBy: (sortType: string) => void;
}

export function Filters({
  open,
  id,
  anchorEl,
  setAnchorEl,
  tagFilters,
  updateFilter,
  sortBy,
  updateSortBy,
}: FilterProps) {
  const [filterList, setFilterList] = React.useState<string[]>([]);
  const { questions } = useAppSelector((state: RootState) => state.feed);

  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    let list: string[] = [];
    questions.forEach((ques) =>
      ques.tags.forEach((tag) => {
        if (!list.includes(tag)) {
          list.push(tag);
        }
      })
    );
    setFilterList(list);
  }, [questions]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      updateFilter(event.target.name, "add");
    } else {
      updateFilter(event.target.name, "remove");
    }
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateSortBy((event.target as HTMLInputElement).value);
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
          maxHeight: 400,
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "0.4em",
          },
          "&::-webkit-scrollbar-track": {
            boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
            webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
          },
          "&::-webkit-scrollbar-thumb": {
            borderRadius: 2,
            backgroundColor: "rgba(0,0,0,.1)",
          },
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
            {filterList.map((tag) => (
              <FormControlLabel
                key={tag}
                control={
                  <Checkbox
                    size="small"
                    sx={{ py: 0.5 }}
                    checked={tagFilters.includes(tag)}
                    onChange={handleFilterChange}
                    name={tag}
                  />
                }
                label={tag}
              />
            ))}
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
            value={sortBy}
            onChange={handleSortChange}
          >
            <FormControlLabel
              value="Latest"
              control={<Radio size="small" sx={{ py: 0.5 }} />}
              label="Latest"
            />
            <FormControlLabel
              value="Oldest"
              control={<Radio size="small" sx={{ py: 0.5 }} />}
              label="Oldest"
            />
          </RadioGroup>
        </FormControl>
      </Box>
    </Popover>
  );
}
