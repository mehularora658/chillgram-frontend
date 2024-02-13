Fix this in 
src/Components/Friend.jsx

```
<Box
                    onClick={() => {
                        navigate(`/profile/${friendId}`);
                        navigate(0);
                    }}
                >
```
if navigate(0) is removed then it causes a bug which is
when user goes to a frind profile then from there to another friend 
a issue comes that data updates but components does not re render
so look into it if you have time 
