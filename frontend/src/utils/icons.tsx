import type { IconType } from 'react-icons';
import * as FaSolid from 'react-icons/fa';
import * as Md from 'react-icons/md';
import * as Bs from 'react-icons/bs';
import * as Bi from 'react-icons/bi';
import * as Io from 'react-icons/io5';
import * as Hi from 'react-icons/hi2';
import * as Si from 'react-icons/si';
import * as Gi from 'react-icons/gi';
import * as Pi from 'react-icons/pi';
import * as Lu from 'react-icons/lu';
import * as Tb from 'react-icons/tb';

export interface IconOption {
  name: string;
  component: IconType;
  library: string;
  keywords: string[];
}

// Comprehensive list of icons with keywords for searching
export const AVAILABLE_ICONS: IconOption[] = [
  // Alerts & Notifications
  { name: 'FaBell', component: FaSolid.FaBell, library: 'FontAwesome', keywords: ['alert', 'notification', 'bell', 'alarm', 'reminder'] },
  { name: 'FaClock', component: FaSolid.FaClock, library: 'FontAwesome', keywords: ['time', 'clock', 'timer', 'alarm', 'schedule'] },
  { name: 'MdAlarm', component: Md.MdAlarm, library: 'Material Design', keywords: ['alarm', 'clock', 'time', 'alert'] },

  // Weather
  { name: 'FaSun', component: FaSolid.FaSun, library: 'FontAwesome', keywords: ['sun', 'weather', 'sunny', 'day', 'bright'] },
  { name: 'FaCloud', component: FaSolid.FaCloud, library: 'FontAwesome', keywords: ['cloud', 'weather', 'cloudy', 'sky'] },
  { name: 'FaCloudRain', component: FaSolid.FaCloudRain, library: 'FontAwesome', keywords: ['rain', 'weather', 'rainy', 'storm'] },
  { name: 'FaSnowflake', component: FaSolid.FaSnowflake, library: 'FontAwesome', keywords: ['snow', 'weather', 'cold', 'winter'] },
  { name: 'MdWbSunny', component: Md.MdWbSunny, library: 'Material Design', keywords: ['sun', 'weather', 'sunny', 'day'] },

  // Music & Audio
  { name: 'FaMusic', component: FaSolid.FaMusic, library: 'FontAwesome', keywords: ['music', 'audio', 'sound', 'song', 'play'] },
  { name: 'FaVolumeUp', component: FaSolid.FaVolumeUp, library: 'FontAwesome', keywords: ['volume', 'audio', 'sound', 'speaker', 'loud'] },
  { name: 'FaVolumeDown', component: FaSolid.FaVolumeDown, library: 'FontAwesome', keywords: ['volume', 'audio', 'sound', 'quiet'] },
  { name: 'FaMicrophone', component: FaSolid.FaMicrophone, library: 'FontAwesome', keywords: ['microphone', 'audio', 'record', 'voice', 'mic'] },
  { name: 'MdMusicNote', component: Md.MdMusicNote, library: 'Material Design', keywords: ['music', 'note', 'audio', 'song'] },
  { name: 'BsMusicNoteList', component: Bs.BsMusicNoteList, library: 'Bootstrap', keywords: ['music', 'playlist', 'list', 'songs'] },

  // Entertainment
  { name: 'FaFilm', component: FaSolid.FaFilm, library: 'FontAwesome', keywords: ['film', 'movie', 'video', 'entertainment', 'cinema'] },
  { name: 'FaPlay', component: FaSolid.FaPlay, library: 'FontAwesome', keywords: ['play', 'media', 'video', 'audio', 'start'] },
  { name: 'FaTv', component: FaSolid.FaTv, library: 'FontAwesome', keywords: ['tv', 'television', 'screen', 'display'] },
  { name: 'FaGamepad', component: FaSolid.FaGamepad, library: 'FontAwesome', keywords: ['game', 'gaming', 'play', 'controller'] },
  { name: 'MdMovie', component: Md.MdMovie, library: 'Material Design', keywords: ['movie', 'film', 'video', 'entertainment'] },
  { name: 'FaYoutube', component: FaSolid.FaYoutube, library: 'FontAwesome', keywords: ['youtube', 'video', 'media', 'streaming'] },

  // Home & IoT
  { name: 'FaHome', component: FaSolid.FaHome, library: 'FontAwesome', keywords: ['home', 'house', 'main', 'assistant'] },
  { name: 'FaLightbulb', component: FaSolid.FaLightbulb, library: 'FontAwesome', keywords: ['light', 'bulb', 'lamp', 'smart', 'home'] },
  { name: 'FaThermometerHalf', component: FaSolid.FaThermometerHalf, library: 'FontAwesome', keywords: ['temperature', 'thermometer', 'weather', 'climate'] },
  { name: 'MdHome', component: Md.MdHome, library: 'Material Design', keywords: ['home', 'house', 'main'] },
  { name: 'IoHomeSharp', component: Io.IoHomeSharp, library: 'Ionicons', keywords: ['home', 'house', 'assistant'] },

  // Communication
  { name: 'FaComments', component: FaSolid.FaComments, library: 'FontAwesome', keywords: ['comments', 'chat', 'message', 'talk', 'conversation'] },
  { name: 'FaEnvelope', component: FaSolid.FaEnvelope, library: 'FontAwesome', keywords: ['email', 'mail', 'message', 'envelope'] },
  { name: 'FaPhone', component: FaSolid.FaPhone, library: 'FontAwesome', keywords: ['phone', 'call', 'telephone', 'contact'] },
  { name: 'MdMessage', component: Md.MdMessage, library: 'Material Design', keywords: ['message', 'chat', 'text', 'sms'] },

  // Utilities & Tools
  { name: 'FaCog', component: FaSolid.FaCog, library: 'FontAwesome', keywords: ['settings', 'config', 'gear', 'options', 'system'] },
  { name: 'FaSearch', component: FaSolid.FaSearch, library: 'FontAwesome', keywords: ['search', 'find', 'query', 'lookup'] },
  { name: 'FaCalculator', component: FaSolid.FaCalculator, library: 'FontAwesome', keywords: ['calculator', 'math', 'calculate', 'numbers'] },
  { name: 'FaCalendar', component: FaSolid.FaCalendar, library: 'FontAwesome', keywords: ['calendar', 'date', 'schedule', 'event'] },
  { name: 'MdSettings', component: Md.MdSettings, library: 'Material Design', keywords: ['settings', 'config', 'options', 'system'] },
  { name: 'IoSettings', component: Io.IoSettings, library: 'Ionicons', keywords: ['settings', 'config', 'gear'] },

  // Information & Help
  { name: 'FaInfoCircle', component: FaSolid.FaInfoCircle, library: 'FontAwesome', keywords: ['info', 'information', 'help', 'about'] },
  { name: 'FaQuestion', component: FaSolid.FaQuestion, library: 'FontAwesome', keywords: ['question', 'help', 'ask', 'query'] },
  { name: 'FaQuestionCircle', component: FaSolid.FaQuestionCircle, library: 'FontAwesome', keywords: ['question', 'help', 'info', 'ask'] },
  { name: 'MdInfo', component: Md.MdInfo, library: 'Material Design', keywords: ['info', 'information', 'help'] },
  { name: 'MdHelp', component: Md.MdHelp, library: 'Material Design', keywords: ['help', 'question', 'info', 'support'] },

  // Food & Cooking
  { name: 'FaUtensils', component: FaSolid.FaUtensils, library: 'FontAwesome', keywords: ['food', 'utensils', 'cooking', 'meal', 'eat', 'recipe'] },
  { name: 'FaPizzaSlice', component: FaSolid.FaPizzaSlice, library: 'FontAwesome', keywords: ['pizza', 'food', 'meal'] },
  { name: 'FaCoffee', component: FaSolid.FaCoffee, library: 'FontAwesome', keywords: ['coffee', 'drink', 'beverage', 'cup'] },
  { name: 'MdRestaurant', component: Md.MdRestaurant, library: 'Material Design', keywords: ['food', 'restaurant', 'meal', 'eat'] },

  // Transportation
  { name: 'FaCar', component: FaSolid.FaCar, library: 'FontAwesome', keywords: ['car', 'vehicle', 'transport', 'drive'] },
  { name: 'FaBus', component: FaSolid.FaBus, library: 'FontAwesome', keywords: ['bus', 'transport', 'transit', 'public'] },
  { name: 'FaPlane', component: FaSolid.FaPlane, library: 'FontAwesome', keywords: ['plane', 'airplane', 'flight', 'travel'] },
  { name: 'MdDirectionsCar', component: Md.MdDirectionsCar, library: 'Material Design', keywords: ['car', 'vehicle', 'transport'] },

  // Reading & Learning
  { name: 'FaBook', component: FaSolid.FaBook, library: 'FontAwesome', keywords: ['book', 'read', 'reading', 'library', 'learn'] },
  { name: 'FaBookReader', component: FaSolid.FaBookReader, library: 'FontAwesome', keywords: ['book', 'read', 'reader', 'reading', 'learn'] },
  { name: 'FaNewspaper', component: FaSolid.FaNewspaper, library: 'FontAwesome', keywords: ['news', 'newspaper', 'article', 'read'] },
  { name: 'MdLibraryBooks', component: Md.MdLibraryBooks, library: 'Material Design', keywords: ['books', 'library', 'read', 'reading'] },
  { name: 'MdSchool', component: Md.MdSchool, library: 'Material Design', keywords: ['school', 'education', 'learn', 'study'] },

  // Sleep & Rest
  { name: 'FaBed', component: FaSolid.FaBed, library: 'FontAwesome', keywords: ['bed', 'sleep', 'rest', 'naptime', 'night'] },
  { name: 'FaMoon', component: FaSolid.FaMoon, library: 'FontAwesome', keywords: ['moon', 'night', 'dark', 'sleep'] },
  { name: 'MdNightsStay', component: Md.MdNightsStay, library: 'Material Design', keywords: ['night', 'moon', 'sleep', 'rest'] },

  // Social & Fun
  { name: 'FaSmile', component: FaSolid.FaSmile, library: 'FontAwesome', keywords: ['smile', 'happy', 'fun', 'emoji', 'joke'] },
  { name: 'FaSmileWink', component: FaSolid.FaSmileWink, library: 'FontAwesome', keywords: ['smile', 'wink', 'fun', 'emoji', 'joke'] },
  { name: 'FaLaugh', component: FaSolid.FaLaugh, library: 'FontAwesome', keywords: ['laugh', 'funny', 'joke', 'humor', 'comedy'] },
  { name: 'FaDice', component: FaSolid.FaDice, library: 'FontAwesome', keywords: ['dice', 'game', 'random', 'play'] },
  { name: 'MdEmojiEmotions', component: Md.MdEmojiEmotions, library: 'Material Design', keywords: ['emoji', 'emotion', 'smile', 'happy'] },

  // Internet & Web
  { name: 'FaGlobe', component: FaSolid.FaGlobe, library: 'FontAwesome', keywords: ['globe', 'world', 'internet', 'web', 'global'] },
  { name: 'FaWifi', component: FaSolid.FaWifi, library: 'FontAwesome', keywords: ['wifi', 'wireless', 'internet', 'network'] },
  { name: 'FaLink', component: FaSolid.FaLink, library: 'FontAwesome', keywords: ['link', 'url', 'web', 'hyperlink'] },
  { name: 'MdPublic', component: Md.MdPublic, library: 'Material Design', keywords: ['public', 'globe', 'world', 'internet'] },
  { name: 'FaWikipediaW', component: FaSolid.FaWikipediaW, library: 'FontAwesome', keywords: ['wikipedia', 'wiki', 'knowledge', 'info'] },

  // Media & Photos
  { name: 'FaImage', component: FaSolid.FaImage, library: 'FontAwesome', keywords: ['image', 'picture', 'photo', 'wallpaper'] },
  { name: 'FaCamera', component: FaSolid.FaCamera, library: 'FontAwesome', keywords: ['camera', 'photo', 'picture', 'capture'] },
  { name: 'MdPhoto', component: Md.MdPhoto, library: 'Material Design', keywords: ['photo', 'image', 'picture'] },
  { name: 'MdWallpaper', component: Md.MdWallpaper, library: 'Material Design', keywords: ['wallpaper', 'background', 'image'] },

  // System & Control
  { name: 'FaPowerOff', component: FaSolid.FaPowerOff, library: 'FontAwesome', keywords: ['power', 'shutdown', 'off', 'control'] },
  { name: 'FaCheck', component: FaSolid.FaCheck, library: 'FontAwesome', keywords: ['check', 'complete', 'done', 'finish', 'success'] },
  { name: 'FaCheckCircle', component: FaSolid.FaCheckCircle, library: 'FontAwesome', keywords: ['check', 'complete', 'done', 'finish', 'success'] },
  { name: 'FaSpinner', component: FaSolid.FaSpinner, library: 'FontAwesome', keywords: ['spinner', 'loading', 'app', 'launcher', 'wait'] },
  { name: 'FaRocket', component: FaSolid.FaRocket, library: 'FontAwesome', keywords: ['rocket', 'launch', 'app', 'start', 'boost'] },
  { name: 'FaDesktop', component: FaSolid.FaDesktop, library: 'FontAwesome', keywords: ['desktop', 'computer', 'screen', 'display'] },
  { name: 'FaFolder', component: FaSolid.FaFolder, library: 'FontAwesome', keywords: ['folder', 'directory', 'file', 'files'] },
  { name: 'FaFolderOpen', component: FaSolid.FaFolderOpen, library: 'FontAwesome', keywords: ['folder', 'open', 'directory', 'files'] },
  { name: 'MdComputer', component: Md.MdComputer, library: 'Material Design', keywords: ['computer', 'desktop', 'device'] },

  // AI & Chat
  { name: 'FaRobot', component: FaSolid.FaRobot, library: 'FontAwesome', keywords: ['robot', 'ai', 'bot', 'chatgpt', 'assistant'] },
  { name: 'FaBrain', component: FaSolid.FaBrain, library: 'FontAwesome', keywords: ['brain', 'think', 'ai', 'intelligence', 'smart'] },
  { name: 'MdSmartToy', component: Md.MdSmartToy, library: 'Material Design', keywords: ['robot', 'toy', 'ai', 'bot'] },

  // Science & Knowledge
  { name: 'FaAtom', component: FaSolid.FaAtom, library: 'FontAwesome', keywords: ['atom', 'science', 'physics', 'chemistry'] },
  { name: 'FaFlask', component: FaSolid.FaFlask, library: 'FontAwesome', keywords: ['flask', 'science', 'lab', 'experiment'] },
  { name: 'MdScience', component: Md.MdScience, library: 'Material Design', keywords: ['science', 'lab', 'experiment'] },

  // Brands & Services
  { name: 'FaSpotify', component: FaSolid.FaSpotify, library: 'FontAwesome', keywords: ['spotify', 'music', 'streaming', 'audio'] },
  { name: 'FaSoundcloud', component: FaSolid.FaSoundcloud, library: 'FontAwesome', keywords: ['soundcloud', 'music', 'audio', 'streaming'] },
  { name: 'FaReddit', component: FaSolid.FaReddit, library: 'FontAwesome', keywords: ['reddit', 'social', 'forum'] },

  // Shopping
  { name: 'FaShoppingCart', component: FaSolid.FaShoppingCart, library: 'FontAwesome', keywords: ['shopping', 'cart', 'buy', 'purchase', 'list'] },
  { name: 'MdShoppingCart', component: Md.MdShoppingCart, library: 'Material Design', keywords: ['shopping', 'cart', 'buy', 'purchase'] },

  // Productivity
  { name: 'FaClipboardList', component: FaSolid.FaClipboardList, library: 'FontAwesome', keywords: ['clipboard', 'list', 'todo', 'tasks', 'checklist'] },
  { name: 'FaTasks', component: FaSolid.FaTasks, library: 'FontAwesome', keywords: ['tasks', 'todo', 'list', 'checklist'] },
  { name: 'MdChecklist', component: Md.MdChecklist, library: 'Material Design', keywords: ['checklist', 'tasks', 'todo', 'list'] },

  // Navigation & Location
  { name: 'FaMapMarkerAlt', component: FaSolid.FaMapMarkerAlt, library: 'FontAwesome', keywords: ['location', 'map', 'marker', 'pin', 'place'] },
  { name: 'FaCompass', component: FaSolid.FaCompass, library: 'FontAwesome', keywords: ['compass', 'direction', 'navigation'] },
  { name: 'MdLocationOn', component: Md.MdLocationOn, library: 'Material Design', keywords: ['location', 'map', 'place', 'pin'] },

  // Sport & Fitness
  { name: 'FaDumbbell', component: FaSolid.FaDumbbell, library: 'FontAwesome', keywords: ['dumbbell', 'fitness', 'gym', 'exercise', 'sport'] },
  { name: 'FaHeartbeat', component: FaSolid.FaHeartbeat, library: 'FontAwesome', keywords: ['heartbeat', 'health', 'fitness', 'heart'] },
  { name: 'MdFitnessCenter', component: Md.MdFitnessCenter, library: 'Material Design', keywords: ['fitness', 'gym', 'exercise'] },

  // Radio & Podcasts
  { name: 'FaBroadcastTower', component: FaSolid.FaBroadcastTower, library: 'FontAwesome', keywords: ['broadcast', 'radio', 'tower', 'antenna', 'streaming'] },
  { name: 'FaPodcast', component: FaSolid.FaPodcast, library: 'FontAwesome', keywords: ['podcast', 'audio', 'radio', 'broadcast'] },
  { name: 'MdRadio', component: Md.MdRadio, library: 'Material Design', keywords: ['radio', 'broadcast', 'audio'] },
  { name: 'TbRadio', component: Tb.TbRadio, library: 'Tabler', keywords: ['radio', 'broadcast', 'audio', 'fm'] },

  // Brand Icons - Simple Icons
  { name: 'SiSpotify', component: Si.SiSpotify, library: 'Simple Icons', keywords: ['spotify', 'music', 'streaming', 'audio', 'brand'] },
  { name: 'SiSoundcloud', component: Si.SiSoundcloud, library: 'Simple Icons', keywords: ['soundcloud', 'music', 'audio', 'streaming', 'brand'] },
  { name: 'SiYoutube', component: Si.SiYoutube, library: 'Simple Icons', keywords: ['youtube', 'video', 'media', 'streaming', 'brand'] },
  { name: 'SiYoutubemusic', component: Si.SiYoutubemusic, library: 'Simple Icons', keywords: ['youtube', 'music', 'streaming', 'audio', 'brand'] },
  { name: 'SiNetflix', component: Si.SiNetflix, library: 'Simple Icons', keywords: ['netflix', 'video', 'streaming', 'movies', 'brand'] },
  { name: 'SiTwitch', component: Si.SiTwitch, library: 'Simple Icons', keywords: ['twitch', 'streaming', 'video', 'gaming', 'brand'] },
  { name: 'SiReddit', component: Si.SiReddit, library: 'Simple Icons', keywords: ['reddit', 'social', 'forum', 'brand'] },
  { name: 'SiWikipedia', component: Si.SiWikipedia, library: 'Simple Icons', keywords: ['wikipedia', 'wiki', 'knowledge', 'info', 'brand'] },
  { name: 'SiOpenai', component: Si.SiOpenai, library: 'Simple Icons', keywords: ['openai', 'chatgpt', 'ai', 'gpt', 'brand'] },
  { name: 'SiGoogle', component: Si.SiGoogle, library: 'Simple Icons', keywords: ['google', 'search', 'assistant', 'brand'] },
  { name: 'SiHomeassistant', component: Si.SiHomeassistant, library: 'Simple Icons', keywords: ['home', 'assistant', 'smart', 'automation', 'brand'] },
  { name: 'SiTunein', component: Si.SiTunein, library: 'Simple Icons', keywords: ['tunein', 'radio', 'streaming', 'audio', 'brand'] },
  { name: 'SiBandcamp', component: Si.SiBandcamp, library: 'Simple Icons', keywords: ['bandcamp', 'music', 'audio', 'streaming', 'brand'] },
  { name: 'SiApplemusic', component: Si.SiApplemusic, library: 'Simple Icons', keywords: ['apple', 'music', 'streaming', 'audio', 'brand'] },
  { name: 'SiPandora', component: Si.SiPandora, library: 'Simple Icons', keywords: ['pandora', 'music', 'streaming', 'radio', 'brand'] },

  // More Weather Icons
  { name: 'TbCloudRain', component: Tb.TbCloudRain, library: 'Tabler', keywords: ['rain', 'weather', 'cloud', 'storm'] },
  { name: 'TbSun', component: Tb.TbSun, library: 'Tabler', keywords: ['sun', 'weather', 'sunny', 'day'] },
  { name: 'BiSun', component: Bi.BiSun, library: 'Bootstrap Icons', keywords: ['sun', 'weather', 'sunny'] },
  { name: 'BiCloud', component: Bi.BiCloud, library: 'Bootstrap Icons', keywords: ['cloud', 'weather', 'cloudy'] },

  // More Music & Audio
  { name: 'PiMusicNotesFill', component: Pi.PiMusicNotesFill, library: 'Phosphor', keywords: ['music', 'notes', 'audio', 'song'] },
  { name: 'LuMusic', component: Lu.LuMusic, library: 'Lucide', keywords: ['music', 'audio', 'sound'] },
  { name: 'BiMicrophone', component: Bi.BiMicrophone, library: 'Bootstrap Icons', keywords: ['microphone', 'audio', 'record', 'voice'] },
  { name: 'HiMusicalNote', component: Hi.HiMusicalNote, library: 'Heroicons', keywords: ['music', 'note', 'audio'] },

  // More Entertainment
  { name: 'PiTelevisionFill', component: Pi.PiTelevisionFill, library: 'Phosphor', keywords: ['tv', 'television', 'video', 'screen'] },
  { name: 'LuFilm', component: Lu.LuFilm, library: 'Lucide', keywords: ['film', 'movie', 'video', 'cinema'] },
  { name: 'BiCameraMovie', component: Bi.BiCameraMovie, library: 'Bootstrap Icons', keywords: ['camera', 'movie', 'video', 'film'] },
  { name: 'HiTv', component: Hi.HiTv, library: 'Heroicons', keywords: ['tv', 'television', 'screen'] },

  // More Food & Cooking
  { name: 'LuUtensilsCrossed', component: Lu.LuUtensilsCrossed, library: 'Lucide', keywords: ['utensils', 'food', 'eat', 'meal', 'cooking'] },
  { name: 'BiDish', component: Bi.BiDish, library: 'Bootstrap Icons', keywords: ['dish', 'food', 'meal', 'plate'] },
  { name: 'PiForkKnifeFill', component: Pi.PiForkKnifeFill, library: 'Phosphor', keywords: ['fork', 'knife', 'utensils', 'food'] },
  { name: 'TbToolsKitchen', component: Tb.TbToolsKitchen, library: 'Tabler', keywords: ['kitchen', 'tools', 'cooking', 'food'] },

  // More Reading & Learning
  { name: 'LuBookOpen', component: Lu.LuBookOpen, library: 'Lucide', keywords: ['book', 'open', 'read', 'reading'] },
  { name: 'BiBook', component: Bi.BiBook, library: 'Bootstrap Icons', keywords: ['book', 'read', 'reading', 'library'] },
  { name: 'PiBookOpenTextFill', component: Pi.PiBookOpenTextFill, library: 'Phosphor', keywords: ['book', 'text', 'read', 'reading'] },
  { name: 'HiNewspaper', component: Hi.HiNewspaper, library: 'Heroicons', keywords: ['newspaper', 'news', 'article', 'read'] },
  { name: 'TbNews', component: Tb.TbNews, library: 'Tabler', keywords: ['news', 'newspaper', 'article'] },

  // More Games & Fun
  { name: 'GiDiceTwentyFacesTwenty', component: Gi.GiDiceTwentyFacesTwenty, library: 'Game Icons', keywords: ['dice', 'd20', 'game', 'random', 'rpg'] },
  { name: 'GiCardJoker', component: Gi.GiCardJoker, library: 'Game Icons', keywords: ['card', 'joker', 'game', 'fun', 'joke'] },
  { name: 'GiLightningMask', component: Gi.GiLightningMask, library: 'Game Icons', keywords: ['mask', 'superhero', 'game', 'fun'] },
  { name: 'BiJoystick', component: Bi.BiJoystick, library: 'Bootstrap Icons', keywords: ['joystick', 'game', 'gaming', 'controller'] },
  { name: 'LuGamepad2', component: Lu.LuGamepad2, library: 'Lucide', keywords: ['gamepad', 'game', 'gaming', 'controller'] },

  // More System & Control
  { name: 'LuSettings', component: Lu.LuSettings, library: 'Lucide', keywords: ['settings', 'config', 'gear', 'options'] },
  { name: 'BiCog', component: Bi.BiCog, library: 'Bootstrap Icons', keywords: ['cog', 'settings', 'config', 'gear'] },
  { name: 'HiCog', component: Hi.HiCog, library: 'Heroicons', keywords: ['cog', 'settings', 'config'] },
  { name: 'TbSettings', component: Tb.TbSettings, library: 'Tabler', keywords: ['settings', 'config', 'options'] },

  // More Communication
  { name: 'LuMessageCircle', component: Lu.LuMessageCircle, library: 'Lucide', keywords: ['message', 'chat', 'conversation', 'talk'] },
  { name: 'BiChat', component: Bi.BiChat, library: 'Bootstrap Icons', keywords: ['chat', 'message', 'conversation'] },
  { name: 'HiChatBubbleLeftRight', component: Hi.HiChatBubbleLeftRight, library: 'Heroicons', keywords: ['chat', 'message', 'conversation'] },
  { name: 'TbMessageCircle', component: Tb.TbMessageCircle, library: 'Tabler', keywords: ['message', 'chat', 'conversation'] },

  // More AI & Technology
  { name: 'LuBot', component: Lu.LuBot, library: 'Lucide', keywords: ['bot', 'robot', 'ai', 'assistant'] },
  { name: 'BiBot', component: Bi.BiBot, library: 'Bootstrap Icons', keywords: ['bot', 'robot', 'ai', 'assistant'] },
  { name: 'TbRobot', component: Tb.TbRobot, library: 'Tabler', keywords: ['robot', 'ai', 'bot', 'assistant'] },
  { name: 'PiRobotFill', component: Pi.PiRobotFill, library: 'Phosphor', keywords: ['robot', 'ai', 'bot'] },

  // Navigation & Maps
  { name: 'LuNavigation', component: Lu.LuNavigation, library: 'Lucide', keywords: ['navigation', 'location', 'map', 'direction'] },
  { name: 'BiMap', component: Bi.BiMap, library: 'Bootstrap Icons', keywords: ['map', 'location', 'navigation'] },
  { name: 'HiMap', component: Hi.HiMap, library: 'Heroicons', keywords: ['map', 'location', 'navigation'] },
  { name: 'TbMap', component: Tb.TbMap, library: 'Tabler', keywords: ['map', 'location', 'navigation'] },

  // Additional Icons
  { name: 'LuAlarmClock', component: Lu.LuAlarmClock, library: 'Lucide', keywords: ['alarm', 'clock', 'time', 'alert', 'reminder'] },
  { name: 'BiAlarm', component: Bi.BiAlarm, library: 'Bootstrap Icons', keywords: ['alarm', 'clock', 'time', 'alert'] },
  { name: 'HiBell', component: Hi.HiBell, library: 'Heroicons', keywords: ['bell', 'notification', 'alert', 'alarm'] },
  { name: 'TbBell', component: Tb.TbBell, library: 'Tabler', keywords: ['bell', 'notification', 'alert'] },
];

// Icon lookup with fallback
export function getIconByName(iconName: string | undefined | null): IconType {
  if (!iconName) {
    return FaSolid.FaQuestion;
  }

  const icon = AVAILABLE_ICONS.find(i => i.name === iconName);
  return icon ? icon.component : FaSolid.FaQuestion;
}

// Search icons by keyword
export function searchIcons(query: string): IconOption[] {
  if (!query) {
    return AVAILABLE_ICONS;
  }

  const lowerQuery = query.toLowerCase();
  return AVAILABLE_ICONS.filter(icon =>
    icon.name.toLowerCase().includes(lowerQuery) ||
    icon.keywords.some(keyword => keyword.includes(lowerQuery))
  );
}

// Get popular/default icons
export function getPopularIcons(): IconOption[] {
  const popularNames = [
    'FaBell', 'FaClock', 'FaSun', 'FaMusic', 'FaVolumeUp', 'FaFilm',
    'FaHome', 'FaLightbulb', 'FaCog', 'FaSearch', 'FaBook', 'FaSmile',
    'FaMicrophone', 'FaGamepad', 'FaNewspaper', 'FaRobot', 'FaUtensils',
    'FaBed', 'FaCamera', 'FaShoppingCart', 'FaCalendar', 'FaInfoCircle',
    'SiSpotify', 'SiYoutube', 'SiSoundcloud', 'SiWikipedia', 'SiOpenai',
    'SiHomeassistant', 'LuBot', 'TbRadio', 'HiMusicalNote', 'BiMicrophone'
  ];

  return AVAILABLE_ICONS.filter(icon => popularNames.includes(icon.name));
}
