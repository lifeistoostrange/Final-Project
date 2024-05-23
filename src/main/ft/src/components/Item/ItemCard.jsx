import { CardContent, CardMedia, Stack, Typography } from "@mui/material";
import Rating from "../Rating";
import CountDown from "../CountDown";

export default function ItemCard({ item, navigate }) {
  const isNewItem = new Date(item.regDate) > new Date(new Date().setDate(new Date().getDate() - 7));
  console.log(new Date().setDate(new Date().getDate() - 7));
  return (
    <div className="paper-item" onClick={() => { navigate(`/item/detail/${item.iid}`) }} sx={{ maxWidth: 300, paddingBottom: 0 }}>
      <div style={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="220"
          image={item.img1}
          alt={item.name}
        />
        <Typography
          sx={{
            position: 'absolute',
            top: '3px',
            left: '3px',
            borderRadius: '5px',
            zIndex: 1,
            textAlign: 'center',
            fontSize: '0.8rem',
          }}
        >
         {isNewItem && (
          <span 
            style={{ 
              cursor: 'pointer',
              display: "inline-block",
              borderRadius: "999px",
              padding: "2px 8px",
              marginRight: "5px",
              fontSize: "0.7rem",
              fontWeight: "bold",
              color: "white",
              backgroundColor: 'rgb(22, 106, 220)', 
            }}>
            new
          </span>
          )}
           {new Date(item.saleDate) > new Date() && (
            <span 
              style={{ 
                cursor: 'pointer',
                display: "inline-block",
                borderRadius: "999px",
                padding: "2px 8px",
                marginRight: "5px",
                fontSize: "0.7rem",
                fontWeight: "bold",
                color: "white",
                backgroundColor: 'rgb(220, 22, 26)', 
              }}>
            sale
            </span>
           )}
        </Typography>
        {new Date(item.saleDate) > new Date() && (
          <Typography
            sx={{
              position: 'absolute',
              top: '2px', 
              right: '2px', 
              backgroundColor: 'rgba(0, 0, 0, 0.8)', 
              color: 'white',
              padding: '3px 7px', 
              width: '28px',
              height: '28px',
              borderRadius: '5px',
              zIndex: 1, 
              textAlign: 'center',
              fontSize: '0.8rem', 
              lineHeight: '28px',
            }}
          >
            {((item.price - item.salePrice) / item.price * 100).toFixed(0)}%
          </Typography>
        )}
      </div>
      <CardContent sx={{ flexGrow: 0.7 }}>
        <Typography variant="body2" className="item-name" noWrap style={{ height: '1.8em' }}>
          {item.name}
        </Typography>
        <Rating key={item.iid} item={item} strSize={16} className="item-rating" />
        {new Date(item.saleDate) > new Date() && (
          <CountDown saleDate={item.saleDate} />
        )}
        <Stack direction={'row'} justifyContent="space-between">
          {item.salePrice !== 0 && item.salePrice && new Date(item.saleDate) > new Date() ? (
            <>
              <Typography variant="body2">{((item.price - item.salePrice) / item.price * 100).toFixed(0)}%</Typography>
              <Typography variant="body2" style={{ textDecoration: 'line-through', fontSize: '0.9rem', marginTop: '0.4px' }}>{item.price.toLocaleString()}원</Typography>
              <Typography variant="body2" className="price">{item.salePrice.toLocaleString()}원</Typography>
            </>
          ) : (
            <Typography variant="body2" className="price">{item.price.toLocaleString()}원</Typography>
          )}
        </Stack>
      </CardContent>
    </div>
  );
}