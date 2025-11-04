export const GROUND_HEIGHT = 80;

export const CONTAINER_WIDTH = 400;
export const CONTAINER_HEIGHT = 750;

export const GRAVITY = 0.8;

export const PIPE_GAP_SIZE = 300;
export const PIPE_SPEED = -3;

export const SPAWN_INTERVAL = 90;

export const BIRD_X_PERCENT = 20;
export const BIRD_X = (BIRD_X_PERCENT / 100) * CONTAINER_WIDTH; // convert to pixels
export const BIRD_WIDTH = 40;
export const BIRD_HEIGHT = 50;
export const BIRD_LEFT = BIRD_X;
export const BIRD_RIGHT = BIRD_X + BIRD_WIDTH;

export const PIPE_WIDTH = 140;
export const GROUND_LEVEL = CONTAINER_HEIGHT - GROUND_HEIGHT - BIRD_HEIGHT;
