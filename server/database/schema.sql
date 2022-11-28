CREATE TABLE IF NOT EXISTS users (
  id SERIAL NOT NULL,
  username VARCHAR(60) NOT NULL,
  email VARCHAR(100) NOT NULL,
  bio VARCHAR(600) DEFAULT '',
  profile_photo_url VARCHAR DEFAULT '',
  auth_key VARCHAR NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS follows (
  id SERIAL NOT NULL,
  user_following_id INT NOT NULL REFERENCES users(id),
  user_followed_id INT NOT NULL REFERENCES users(id),
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS videos (
  id SERIAL NOT NULL,
  video_url VARCHAR NOT NULL,
  creator_id INT NOT NULL REFERENCES users(id),
  summary VARCHAR(500) NOT NULL DEFAULT '',
  created_at TIMESTAMP DEFAULT Now(),
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS likes (
  id SERIAL NOT NULL,
  video_id INT NOT NULL REFERENCES videos(id),
  user_id INT NOT NULL REFERENCES users(id),
  PRIMARY KEY (id),
  UNIQUE(video_id, user_id)
);

CREATE TABLE IF NOT EXISTS comments (
  id SERIAL NOT NULL,
  commenter_id INT NOT NULL,
  video_id INT NOT NULL,
  comment VARCHAR(500) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT Now(),
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS tags (
  id SERIAL NOT NULL,
  tag VARCHAR(80) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE(tag)
);

CREATE TABLE IF NOT EXISTS video_tags (
  id SERIAL NOT NULL,
  video_id INT NOT NULL REFERENCES videos(id),
  tag_id INT NOT NULL REFERENCES tags(id),
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS user_interests (
  id SERIAL NOT NULL,
  user_id INT NOT NULL REFERENCES users(id),
  tag_id INT NOT NULL REFERENCES tags(id),
  PRIMARY KEY (id)
);

