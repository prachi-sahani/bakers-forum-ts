import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  OutlinedInput,
  Typography,
} from "../utilities/material-ui/material-components";

const trendingList = [
  "COVID-19",
  "JAVASCRIPT",
  "TECH NEWS",
  "ROC8",
  "REACTJS",
  "NEOGCAMP",
  "CAREER",
];
export function TrendingSection() {
  return (
    <Box sx={{ p: 1, minWidth: "20%" }}>
      <OutlinedInput
        fullWidth
        placeholder="Search posts, people, anything"
        sx={{ fontSize: 14 }}
        inputProps={{ style: { padding: 6 } }}
      />
      <Box sx={{ my: 2, display: { xs: "none", md: "block" } }}>
        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
          Trending Topics
        </Typography>
        <List>
          {trendingList.map((item, index) => (
            <ListItem sx={{ p: 0 }} key={index}>
              <ListItemText secondary={`#${index + 1} ${item}`} />
              <Button
                size="small"
                variant="text"
                sx={{ fontSize: 12, textTransform: "none" }}
              >
                Follow +
              </Button>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
}
