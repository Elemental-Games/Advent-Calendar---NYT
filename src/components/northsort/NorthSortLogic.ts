export const checkNearMatch = (selectedWords: string[], groups: Array<{ words: string[] }>) => {
  for (const group of groups) {
    const matchingWords = selectedWords.filter(word => 
      group.words.includes(word)
    );
    if (matchingWords.length === 3) {
      return true;
    }
  }
  return false;
};

export const findMatchingGroup = (selectedWords: string[], groups: Array<{ category: string; words: string[] }>) => {
  return groups.find(group =>
    group.words.every(word => selectedWords.includes(word)) &&
    selectedWords.every(word => group.words.includes(word))
  );
};

export const getCompletedWords = (completedGroups: string[], groups: Array<{ category: string; words: string[] }>) => {
  return completedGroups.flatMap(category => {
    const group = groups.find(g => g.category === category);
    return group ? group.words : [];
  });
};

export const getRemainingWords = (allWords: string[], completedWords: string[]) => {
  console.log('Filtering words:', { allWords, completedWords });
  return allWords.filter(word => !completedWords.includes(word));
};