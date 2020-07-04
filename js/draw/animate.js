// used only for animation in the tutorial
window.playHistory = function (num=0,startFramesToOmit,endFramesToOmit) {
  if (ui.nowPlayingHistory) {
    return;
  }
  let st = graph.stateOf();
  ui.restoreHistory(num,function () {
    ui.unselect();
    graph.disconnectAll();
    graph.restoreState(st);
    core.root.draw();
    
  },startFramesToOmit,endFramesToOmit);
}
