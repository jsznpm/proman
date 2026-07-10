# Material UI: React tətbiqinə hazır komponent dəsti necə qoşulur?

React tətbiqi qurarkən hər düymə, hər input, hər naviqasiya elementi üçün sıfırdan komponent yazmaq vaxt itkisidir. Məhz buna görə əksər komandalar hazır **UI komponent kitabxanası** üzərində işləyir. Bazarda onlarla belə kitabxana var, düzgün seçim adətən layihənin ehtiyaclarına bağlıdır.

Bu yazıda ən populyar seçimlərdən biri olan **Material UI** (MUI) kitabxanasına baxacağıq. MUI-nin üstünlüyü sadədir: Google-un Material Design prinsiplərinə əsaslanan, tam fərdiləşdirilə bilən, yaxşı sənədləşdirilmiş komponent dəsti. Sırasıyla:

* Layout (yerləşdirmə) komponentləri
* Naviqasiya komponentləri
* İstifadəçi girişi (input) komponentləri
* Stil və tema sistemi

---

## Layout: Container və Grid

Səhifədəki elementləri düzgün yerləşdirmək — xüsusilə müxtəlif ekran ölçülərində — çətin işdir. Elementlər bir-birinə keçməməli, boşluqlar düzgün paylanmalı, ekran kiçiləndə/böyüyəndə layout "sınmamalıdır". MUI bu problemi iki komponentlə həll edir: `Container` və `Grid`.

### Container — enin idarəsi

`Container` komponenti öz içindəki elementlərin **üfüqi enini** məhdudlaşdırır. `maxWidth` xüsusiyyəti bir breakpoint (ekran ölçüsü kəsişmə nöqtəsi) qəbul edir — `sm` (kiçik), `md` (orta), `lg` (böyük) və s.

```jsx
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export default function MyApp() {
  const textStyle = {
    backgroundColor: "#cfe8fc",
    margin: 1,
    textAlign: "center",
  };
  return (
    <>
      <Container maxWidth="sm">
        <Typography sx={textStyle}>sm</Typography>
      </Container>
      <Container maxWidth="md">
        <Typography sx={textStyle}>md</Typography>
      </Container>
      <Container maxWidth="lg">
        <Typography sx={textStyle}>lg</Typography>
      </Container>
    </>
  );
}
```

`Typography` mətni göstərmək üçün istifadə olunur. Hər `Container` öz `maxWidth` dəyərinə çatana qədər ekranla birlikdə böyüyür, sonra dayanır. Yəni `sm` konteyner kiçik bir enə çatan kimi artıq genişlənmir, `lg` isə daha uzun müddət böyüməyə davam edir.

> `Container` sənə üfüqi böyümə üzərində nəzarət verir — ekran ölçüsü dəyişəndə layout özü uyğunlaşır, sən əl ilə media query yazmırsan.

### Grid — cədvəl əsaslı yerləşdirmə

`Container` tək bir bloku məhdudlaşdırırsa, `Grid` bütün səhifə strukturunu qurur. `Grid` iki rolda çıxış edə bilər: **konteyner** (uşaqları saxlayan) və ya **element** (konteynerin daxilindəki bir hissə). Bu iki rolun kombinasiyası ilə istənilən layout qurmaq mümkündür.

```jsx
const headerFooterStyle = { textAlign: "center", height: 50 };
const mainStyle = { textAlign: "center", padding: "8px 16px" };

const Item = styled(Paper)(() => ({
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export default function App() {
  return (
    <Grid container spacing={2} sx={{ backgroundColor: "#F3F6F9" }}>
      <Grid xs={12}>
        <Item sx={headerFooterStyle}>
          <Typography sx={mainStyle}>Header</Typography>
        </Item>
      </Grid>
      <Grid xs="auto">
        <Item>
          <Stack spacing={1}>
            <Typography sx={mainStyle}>Nav Item 1</Typography>
            <Typography sx={mainStyle}>Nav Item 2</Typography>
            <Typography sx={mainStyle}>Nav Item 3</Typography>
            <Typography sx={mainStyle}>Nav Item 4</Typography>
          </Stack>
        </Item>
      </Grid>
      <Grid xs>
        <Item>
          <Typography sx={mainStyle}>Main content</Typography>
        </Item>
      </Grid>
      <Grid xs={12}>
        <Item sx={headerFooterStyle}>
          <Typography sx={mainStyle}>Footer</Typography>
        </Item>
      </Grid>
    </Grid>
  );
}
```

Burada tanış bir layout qurulub: header, yan naviqasiya, əsas məzmun, footer. `xs` xüsusiyyətinin üç fərqli dəyəri var:

* `xs={12}` — MUI-nin grid sistemi 12 sütuna bölünür, `12` dəyəri "bütün eni tut" deməkdir. Header və footer buna görə həmişə tam enə yayılır.
* `xs="auto"` — sütun eni məzmununun özünə görə təyin olunur. Naviqasiya bloku `Stack` komponenti ilə elementləri şaquli düzür, eni isə mətnin uzunluğuna görə formalaşır.
* `xs` (dəyərsiz, `true`) — naviqasiyadan sonra qalan **bütün boş sahəni** doldurur. Ona görə əsas məzmun bloku ekranın qalan hissəsini tutur.

> Konteyneri düşün fizionomik olaraq — 12 dilimlik pizza kimi. `xs={12}` bütün pizzanı istəyir, `xs="auto"` yalnız özünə lazım olan dilimi götürür, `xs` isə qalan dilimlərin hamısını yığır.

---

## Naviqasiya komponentləri

### Drawer — sürüşən yan panel

`Drawer` fiziki siyirmə kimi işləyir: klikləndikdə açılır, məzmunu göstərir, sonra yenidən bağlanır. Bu, ekranda yer qənaət edən klassik naviqasiya modelidir — panel yalnız lazım olanda görünür.

```jsx
<BrowserRouter>
  <Button onClick={toggleDrawer}>Open Nav</Button>
  <section>
    <Routes>
      <Route path="/first" element={<First />} />
      <Route path="/second" element={<Second />} />
      <Route path="/third" element={<Third />} />
    </Routes>
  </section>
  <Drawer open={open} onClose={toggleDrawer}>
    <div
      style={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
    >
      <List component="nav">
        {links.map((link) => (
          <NavLink
            key={link.url}
            to={link.url}
            style={{ color: "black", textDecoration: "none" }}
          >
            {({ isActive }) => (
              <ListItemButton selected={isActive}>
                <ListItemText primary={link.name} />
              </ListItemButton>
            )}
          </NavLink>
        ))}
      </List>
    </div>
  </Drawer>
</BrowserRouter>
```

Hər şey `BrowserRouter` daxilindədir, çünki drawer-dəki linklər əslində route-lara işarə edir. `First`, `Second`, `Third` — link klikləndikdə göstərilən əsas məzmun komponentləridir. Açılıb-bağlanma isə sadə bir state ilə idarə olunur:

```jsx
const [open, setOpen] = useState(false);

const toggleDrawer = ({ type, key }) => {
  if (type === "keydown" && (key === "Tab" || key === "Shift")) {
    return;
  }
  setOpen(!open);
};
```

`open` state-i drawer-in görünüb-görünməməsini idarə edir. Drawer-in `onClose` xüsusiyyəti də eyni funksiyanı çağırır — yəni içindəki hər hansı linkə klikləndikdə drawer avtomatik bağlanır.

Linklərin özü sadə siyahı elementi kimi render olunur:

```jsx
const links = [
  { url: "/first", name: "First Page" },
  { url: "/second", name: "Second Page" },
  { url: "/third", name: "Third Page" },
];
```

Hər link `NavLink` vasitəsilə göstərilir — bu komponent həm naviqasiyanı idarə edir, həm də aktiv route-u avtomatik fərqləndirir (`isActive` dəyəri ilə). "First Page" linkinə klikləndikdə drawer bağlanır, `/first` route-unun məzmunu göstərilir, drawer yenidən açılanda isə "First Page" indi aktiv link kimi işarələnmiş görünür.

### Tabs — həmişə görünən naviqasiya

`Drawer`-dən fərqli olaraq, `Tabs` komponenti həmişə ekranda qalır. MUI-nin `Tabs` və `Tab` komponentləri özləri heç bir məzmun göstərmir — sadəcə hansı tab-ın seçildiyini bildirirlər, məzmunu göstərmək tamamilə bizim işimizdir.

```jsx
function RouteLayout() {
  const routeMatch = useRouteMatch(["/", "/page1", "/page2", "/page3"]);
  const currentTab = routeMatch?.pattern?.path;

  return (
    <Box>
      <Tabs value={currentTab}>
        <Tab label="Item One" component={Link} to="/page1" value="/page1" />
        <Tab label="Item Two" component={Link} to="/page2" value="/page2" />
        <Tab label="Item Three" component={Link} to="/page3" value="/page3" />
      </Tabs>
      <Outlet />
    </Box>
  );
}
```

Hər `Tab` daxildə `Link` komponentindən istifadə edir, yəni klikləndikdə router `to` xüsusiyyətindəki route-u aktivləşdirir. `Outlet` isə aktiv route-un məzmununu göstərən yer tutandır. Aktiv tab-ı təyin etmək üçün cari URL-i patternlərlə müqayisə edən köməkçi funksiya işlədilir:

```jsx
function useRouteMatch(patterns) {
  const { pathname } = useLocation();
  for (let i = 0; i < patterns.length; i += 1) {
    const possibleMatch = matchPath(patterns[i], pathname);
    if (possibleMatch !== null) {
      return possibleMatch;
    }
  }
  return null;
}
```

"ITEM TWO" tab-ına klikləndikdə URL dəyişir, aktiv tab yenilənir və `Outlet` yeni məzmunu göstərir — hamısı səhifə yenidən yüklənmədən.

---

## İstifadəçi girişini toplamaq

### Checkbox və Radio — bəli/xeyr, yoxsa bir neçə seçimdən biri?

`Checkbox` iki vəziyyət (doğru/yanlış) üçün, `RadioGroup` isə bir neçə seçimdən **birini** seçmək üçün uyğundur.

```jsx
export default function Checkboxes() {
  const [checkbox, setCheckbox] = React.useState(false);
  const [radio, setRadio] = React.useState("First");

  return (
    <div>
      <FormControlLabel
        label={`Checkbox ${checkbox ? "(checked)" : ""}`}
        control={
          <Checkbox
            checked={checkbox}
            onChange={() => setCheckbox(!checkbox)}
          />
        }
      />
      <FormControl component="fieldset">
        <FormLabel component="legend">{radio}</FormLabel>
        <RadioGroup value={radio} onChange={(e) => setRadio(e.target.value)}>
          <FormControlLabel value="First" label="First" control={<Radio />} />
          <FormControlLabel value="Second" label="Second" control={<Radio />} />
          <FormControlLabel value="Third" label="Third" control={<Radio />} />
        </RadioGroup>
      </FormControl>
    </div>
  );
}
```

`checkbox` state-i `Checkbox`-un `checked` xüsusiyyətini idarə edir, `radio` state-i isə `RadioGroup`-un `value`-sunu. Hər ikisinin `onChange` işləyicisi öz state setter funksiyasını çağırır. `FormControlLabel` checkbox-un yanında etiket göstərir, radio qrupu isə `FormControl` və `FormLabel` ilə əhatələnir. Hər iki etiket cari state-ə uyğun canlı yenilənir.

### TextField və Select — mətn girişi, yoxsa siyahıdan seçim?

`Select` çoxsaylı seçimlər arasından birini götürmək üçün radio-dan daha yer qənaətlidir, çünki seçimlər yalnız menyu açılanda görünür.

```jsx
export default function MySelect() {
  const [value, setValue] = useState();

  return (
    <FormControl>
      <InputLabel id="select-label">My Select</InputLabel>
      <Select
        labelId="select-label"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        inputProps={{ id: "my-select" }}
      >
        <MenuItem value="first">First</MenuItem>
        <MenuItem value="second">Second</MenuItem>
        <MenuItem value="third">Third</MenuItem>
      </Select>
    </FormControl>
  );
}
```

`value` state-i seçilmiş dəyəri saxlayır, `MenuItem`-lər isə mümkün seçimləri təyin edir. `TextField` bundan daha sadədir — heç bir köməkçi komponentə ehtiyac duymur, hər şey birbaşa property vasitəsilə verilir:

```jsx
export default function MyTextInput() {
  const [value, setValue] = useState("");

  return (
    <TextField
      label="Name"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      margin="normal"
    />
  );
}
```

### Button — HTML düyməsi, amma tema ilə inteqrasiya olunmuş

MUI düymələri adi HTML `<button>`-ə bənzəyir, fərq ondadır ki, tema və layout sistemi ilə birbaşa işləyir.

```jsx
export default function App() {
  const [color, setColor] = useState("secondary");
  const updateColor = () => {
    setColor(color === "secondary" ? "primary" : "secondary");
  };

  return (
    <Stack direction="row" spacing={2}>
      <Button variant="contained" color={color} onClick={updateColor}>
        Contained
      </Button>
      <Button color={color} onClick={updateColor}>
        Text
      </Button>
      <Button variant="outlined" color={color} onClick={updateColor}>
        Outlined
      </Button>
      <IconButton color={color} onClick={updateColor}>
        <AndroidIcon />
      </IconButton>
    </Stack>
  );
}
```

Dörd fərqli düymə üslubu (`contained`, mətn, `outlined`, ikon) bir cərgədə göstərilir. İstənilən birinə klikləndikdə `color` state-i dəyişir və **bütün** düymələr eyni anda rəngini `primary`/`secondary` arasında dəyişir.

---

## Stil və tema sistemi

### `styled()` — komponentə xüsusi görünüş vermək

MUI-nin `styled()` funksiyası adi JavaScript obyektindən yeni, stilləndirilmiş komponent yaradır.

```jsx
const StyledButton = styled(Button)(({ theme }) => ({
  "&.MuiButton-root": { margin: theme.spacing(1) },
  "&.MuiButton-contained": { borderRadius: 50 },
  "&.MuiButton-sizeSmall": { fontWeight: theme.typography.fontWeightLight },
}));

export default function App() {
  return (
    <>
      <StyledButton>First</StyledButton>
      <StyledButton variant="contained">Second</StyledButton>
      <StyledButton size="small" variant="outlined">
        Third
      </StyledButton>
    </>
  );
}
```

`MuiButton-root`, `MuiButton-contained`, `MuiButton-sizeSmall` — bunlar özümüzün uydurduğu adlar deyil, MUI-nin `Button` komponentinin CSS API-sinin bir hissəsidir. `root` bütün düymələrə tətbiq olunur, `contained` yalnız `contained` variantına, `sizeSmall` isə kiçik ölçülü düymələrə.

### Tema — bütün tətbiqi bir yerdən idarə etmək

Tək komponentin görünüşünü dəyişmək bir şeydir, bütün tətbiqin görünüşünü idarə etmək başqa. MUI-nin standart teması var, onu iki addımla genişləndirmək olar: `createTheme()` ilə yeni tema obyekti yaratmaq, `ThemeProvider` ilə tətbiqi əhatələmək.

```jsx
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontSize: 11,
  },
  components: {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          marginLeft: 15,
          marginRight: 15,
        },
      },
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Menu anchorEl={document.body} open={true}>
        <MenuItem>First Item</MenuItem>
        <MenuItem>Second Item</MenuItem>
        <MenuItem>Third Item</MenuItem>
      </Menu>
    </ThemeProvider>
  );
}
```

Bu tema iki iş görür: bütün komponentlərin default şrift ölçüsünü 11-ə salır, və `components` bölməsi vasitəsilə hər `MenuItem`-in sol/sağ marjinini dəyişir. `components` bölməsi məhz bunun üçündür — bir komponentin **hər instansını** tətbiq boyu eyni cür stilləndirmək.

> Fərq bunda: `styled()` — tək bir komponentə xüsusi don geyindirir. Tema isə bütün geyim şkafının standartını təyin edir.

---

## Nəticə

Material UI dörd əsas problemi həll edir: layout (`Container`, `Grid`), naviqasiya (`Drawer`, `Tabs`), istifadəçi girişi (`Checkbox`, `Radio`, `Select`, `TextField`, `Button`) və vizual tutarlılıq (`styled()`, tema sistemi).

Sıfırdan komponent yazmaqla hazır kitabxana işlətmək arasındakı fərq budur: birincisi hər layihədə eyni təkərləri yenidən icad etməkdir, ikincisi isə React ekosisteminin artıq həll etdiyi problemlərə vaxt sərf etməmək və enerjini məhsulun özünə yönəltməkdir.
