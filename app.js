const dashboardData = {
  followers: 3812,
  following: 941,
  lostFollower: 23,
  newFollower: 41,
  dontFollowBack: 112,
  mutual: 529,
  lostFollowing: 18,
  blockedYou: 4,
  unblockedYou: 2,
  ghostFollower: 67,
  topFollower: "@nina_berlin",
  interactions: {
    friends: 389,
    strangers: 127,
  },
  lists: {
    lostFollowers: ["@sam.r", "@daytrip.luna", "@karim.codes"],
    newFollowers: ["@maria.nrw", "@rhea.fit", "@luca.foto"],
    dontFollowBack: ["@design.berlin", "@daily_recipe", "@runclub.hamburg"],
    mutual: ["@anna.dev", "@max_reels", "@travel.jules"],
    ghostFollowers: ["@old_school_mike", "@quiet.reader", "@sunset.raw"],
    topFollowers: ["@nina_berlin (312 Interaktionen)", "@max_reels (278)", "@anna.dev (241)"],
    lostFollowing: ["@food.daily", "@gym_goalz", "@camping_hub"],
    blockEvents: [
      "@user_8921 hat dich blockiert",
      "@styleline hat dich blockiert",
      "@travel.old hat dich entblockt",
    ],
  },
};

const metricConfig = [
  ["Followers", dashboardData.followers],
  ["Following", dashboardData.following],
  ["Lost Follower", dashboardData.lostFollower],
  ["New Follower", dashboardData.newFollower],
  ["You don't follow back", dashboardData.dontFollowBack],
  ["You follow each other", dashboardData.mutual],
  ["Ghost Follower", dashboardData.ghostFollower],
  ["Top Follower", dashboardData.topFollower],
  ["Lost Following", dashboardData.lostFollowing],
  ["Blocked you", dashboardData.blockedYou],
  ["Unblocked you", dashboardData.unblockedYou],
];

const interactionsConfig = [
  ["Profile interaction (friends)", dashboardData.interactions.friends, "good"],
  ["Profile interaction (strangers)", dashboardData.interactions.strangers, "warn"],
];

const metricGrid = document.getElementById("metricsGrid");
const interactionGrid = document.getElementById("interactionGrid");

metricConfig.forEach(([label, value]) => {
  const card = document.createElement("div");
  card.className = "metric";
  card.innerHTML = `<div class="label">${label}</div><div class="value">${value}</div>`;
  metricGrid.appendChild(card);
});

interactionsConfig.forEach(([label, value, color]) => {
  const card = document.createElement("div");
  card.className = "metric";
  card.innerHTML = `<div class="label">${label}</div><div class="value">${value}<span class="tag ${color}">Score</span></div>`;
  interactionGrid.appendChild(card);
});

const injectList = (targetId, entries) => {
  const ul = document.getElementById(targetId);
  entries.forEach((entry) => {
    const li = document.createElement("li");
    li.textContent = entry;
    ul.appendChild(li);
  });
};

injectList("lostFollowersList", dashboardData.lists.lostFollowers);
injectList("newFollowersList", dashboardData.lists.newFollowers);
injectList("dontFollowBackList", dashboardData.lists.dontFollowBack);
injectList("mutualList", dashboardData.lists.mutual);
injectList("ghostFollowersList", dashboardData.lists.ghostFollowers);
injectList("topFollowersList", dashboardData.lists.topFollowers);
injectList("lostFollowingList", dashboardData.lists.lostFollowing);
injectList("blockEventsList", dashboardData.lists.blockEvents);

document.getElementById("loginBtn").addEventListener("click", () => {
  document.getElementById("authState").textContent =
    "Demo-Modus verbunden – ersetze dies mit Instagram OAuth.";
});
