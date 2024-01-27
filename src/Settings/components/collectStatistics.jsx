import React from "react";
import { ListItem, Avatar, Switch } from "@rneui/themed";
import { useDispatch, useSelector } from "react-redux";
import { nightModeStyles, nightModeColor } from "../styles/nightModeStyles";
import STRINGS from "../../common/localization";
import { toggleStatistics } from "../../common/actions";
import { styles } from "../styles";

function CollectStatistics() {
  const isNightMode = useSelector((state) => state.isNightMode);
  const isStatistics = useSelector((state) => state.isStatistics);
  const { containerNightStyles } = nightModeStyles(isNightMode);
  const nightColor = nightModeColor(isNightMode);
  const { COLLECT_STATISTICS } = STRINGS;
  const analyticsIcon = require("../../../images/analyticsicon.png");
  const dispatch = useDispatch();
  return (
    <ListItem bottomDivider containerStyle={containerNightStyles}>
      <Avatar source={analyticsIcon} avatarStyle={styles.avatarStyle} />
      <ListItem.Content>
        <ListItem.Title style={nightColor}>{COLLECT_STATISTICS}</ListItem.Title>
      </ListItem.Content>
      <Switch value={isStatistics} onValueChange={(value) => dispatch(toggleStatistics(value))} />
    </ListItem>
  );
}
export default CollectStatistics;
