function toggleStates(states, current){
    current === states[0] ? current = states[1] : current = states[0];
    return current
}